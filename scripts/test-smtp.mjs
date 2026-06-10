// Verifies the contact-form SMTP setup: connects, authenticates, sends a test
// email to CONTACT_TO. Run:  node scripts/test-smtp.mjs
// Reads .env.local manually (Node 18 has no --env-file). Prints no secrets.
import nodemailer from 'nodemailer';
import { readFileSync } from 'node:fs';

const env = {};
try {
  for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch (e) {
  console.error('✗ Could not read .env.local —', e.message);
  process.exit(1);
}

const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465', SMTP_USER, SMTP_PASS, CONTACT_TO } = env;
if (!SMTP_USER || !SMTP_PASS) {
  console.error('✗ SMTP_USER / SMTP_PASS missing in .env.local');
  process.exit(1);
}

const port = Number(SMTP_PORT);
const transporter = nodemailer.createTransport({
  host: SMTP_HOST, port, secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const to = CONTACT_TO || SMTP_USER;
try {
  console.log(`→ Connecting to ${SMTP_HOST}:${port} as ${SMTP_USER} ...`);
  await transporter.verify();
  console.log('✓ Connection + authentication OK');

  const info = await transporter.sendMail({
    from: `"Able Audio — SMTP test" <${SMTP_USER}>`,
    to,
    subject: 'SMTP test ✓ — Able Audio contact form',
    text: 'This confirms the contact-form SMTP setup is working. You can ignore this message.',
  });
  console.log(`✓ Test email sent to ${to}`);
  console.log('  messageId:', info.messageId);
  console.log('  response :', info.response);
  console.log('\nAll good — check that inbox.');
} catch (err) {
  console.error('\n✗ FAILED:', err.message);
  if (/535|Username and Password not accepted|BadCredentials/i.test(err.message))
    console.error('  → Auth rejected. Re-check SMTP_USER and that SMTP_PASS is a valid App Password (2FA must be on).');
  if (/ETIMEDOUT|ECONNREFUSED|ENOTFOUND/i.test(err.message))
    console.error('  → Network/host issue. Check SMTP_HOST/SMTP_PORT and your connection.');
  process.exit(1);
}
