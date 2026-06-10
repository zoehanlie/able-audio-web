'use server';

// Server Action: runs only on the server. The form calls this directly —
// no API route or client fetch needed. Delivery goes through Google Workspace
// (Gmail SMTP) using an App Password — see .env.local.
import nodemailer from 'nodemailer';

export type ContactState = { status: 'idle' | 'success' | 'error'; message?: string };

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  // Honeypot: real users never fill this hidden field — bots do. Drop silently.
  const trap = String(formData.get('company') ?? '').trim();
  if (trap) return { status: 'success' };

  if (!name || !message) {
    return { status: 'error', message: 'Please fill in your name and message.' };
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    // Not configured yet — log so it's testable in dev, but report honestly.
    console.warn('[contact] SMTP not configured (set SMTP_USER / SMTP_PASS in .env.local).', { name, email });
    return { status: 'error', message: 'Email delivery is not configured yet.' };
  }

  const port = Number(SMTP_PORT || 465);
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      // Gmail sends as the authenticated account regardless, so From = SMTP_USER.
      from: `"Able Audio — Website" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: email ? `"${name}" <${email}>` : undefined,
      subject: `[from Website] ${name}`,
      text: `[Name]: ${name}\n[Email]: ${email || '—'}\n[Message]: ${message}`,
      html:
        `<p>[Name]: ${escapeHtml(name)}</p>` +
        `<p>[Email]: ${email ? escapeHtml(email) : '—'}</p>` +
        `<p style="white-space:pre-wrap">[Message]: ${escapeHtml(message)}</p>`,
    });

    return { status: 'success' };
  } catch (err) {
    console.error('[contact] send failed:', err);
    return { status: 'error', message: 'Something went wrong sending your message.' };
  }
}
