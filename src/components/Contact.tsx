'use client';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import { submitContact, type ContactState } from '@/lib/actions';

const initial: ContactState = { status: 'idle' };

export default function Contact() {
  const t = useTranslations('contact');
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <div className="sec-tag">{t('tag')}</div>
          <h2>{t('h')}</h2>
          <p className="c-sub">{t('sub')}</p>
          <div className="c-links">
            <a href="mailto:sales@ableaudiotech.com"><span className="ic">✉</span>sales@ableaudiotech.com</a>
            <a href="https://wa.me/85263358817"><span className="ic">💬</span>WhatsApp · +852 6335 8817</a>
            <a href="https://www.instagram.com/ableaudiotech/"><span className="ic">◎</span>@ableaudiotech</a>
          </div>
        </Reveal>
        <Reveal className="c-form-wrap">
          <form className="c-form" action={action}>
            {/* Honeypot: hidden from people, tempting to bots. Leave empty. */}
            <input
              type="text" name="company" tabIndex={-1} autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <label htmlFor="name">{t('name')}</label>
            <input id="name" name="name" type="text" placeholder={t('phName')} required />
            <label htmlFor="email">{t('email')}</label>
            <input id="email" name="email" type="email" placeholder={t('phEmail')} />
            <label htmlFor="message">{t('message')}</label>
            <textarea id="message" name="message" placeholder={t('phMsg')} required />
            <button className="btn btn-yellow" type="submit" disabled={pending}>
              {pending ? t('sending') : `${t('submit')} →`}
            </button>
            {state.status === 'success' && <p style={{ color: 'var(--yellow)', fontSize: 14 }}>{t('success')}</p>}
            {state.status === 'error' && <p style={{ color: '#ff8a8a', fontSize: 14 }}>{t('error')}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
