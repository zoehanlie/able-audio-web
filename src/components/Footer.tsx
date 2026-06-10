import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const home = `/${useLocale()}`;
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href={`${home}#top`} className="logo"><span className="dot" />ABLE AUDIO</a>
            <p>{t('brandP')}</p>
            <div className="tag">{t('tag')}</div>
          </div>
          <div className="foot-col">
            <h4>{t('c1')}</h4>
            <a href={`${home}/about`}>{nav('about')}</a>
            <a href={`${home}#discover`}>{nav('discover')}</a><a href={`${home}#contact`}>{nav('contact')}</a>
          </div>
          <div className="foot-col">
            <h4>{t('c2')}</h4>
            <a href={`${home}#discover`}>{t('t1')}</a><a href={`${home}#discover`}>{t('t2')}</a><a href={`${home}#discover`}>{t('t3')}</a>
          </div>
          <div className="foot-col">
            <h4>{t('c3')}</h4>
            <a href="mailto:sales@ableaudiotech.com">Email</a>
            <a href="https://wa.me/85263358817">WhatsApp</a>
            <a href="https://www.instagram.com/ableaudiotech/">Instagram</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t('copy')}</span>
          <div className="socials"><a href="https://www.instagram.com/ableaudiotech/">◎</a><a href="#">𝕏</a><a href="#">f</a><a href="#">in</a></div>
        </div>
      </div>
    </footer>
  );
}
