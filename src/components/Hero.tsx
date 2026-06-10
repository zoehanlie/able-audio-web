import Image from 'next/image';
import { useTranslations } from 'next-intl';
import EqRing from './EqRing';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="sq" />{t('eyebrowPre')}<b>{t('eyebrowStrong')}</b></span>
          <h1 className="hero-title">{t('titlePre')}<span className="hl">{t('titleHl')}</span></h1>
          <p className="hero-sub">{t('sub')}</p>
          <div className="hero-actions">
            <a href="#discover" className="btn btn-yellow">{t('btn1')} →</a>
            <a href="#contact" className="btn btn-ghost">▶ {t('btn2')}</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="n">{t('stat1n')}</div><div className="l">{t('stat1l')}</div></div>
            <div className="stat"><div className="n">{t('stat2n')}</div><div className="l">{t('stat2l')}</div></div>
            <div className="stat"><div className="n">{t('stat3n')}</div><div className="l">{t('stat3l')}</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="disc" />
          <EqRing />
          <Image className="hero-prod" src="/images/topspk.png" alt="Able Audio Tech hybrid electrostatic floorstanding speaker" width={408} height={612} priority />
          <div className="badge-float bf-1"><span className="ic"><Image src="/images/membrane.svg" alt="" width={22} height={22} /></span><span>{t('badge1')}</span></div>
          <div className="badge-float bf-2"><span className="ic"><Image src="/images/listen.svg" alt="" width={22} height={22} /></span><span>{t('badge3')}</span></div>
          <div className="badge-float bf-3"><span className="ic"><Image src="/images/plate.svg" alt="" width={22} height={22} /></span><span>{t('badge2')}</span></div>
        </div>
      </div>
    </header>
  );
}
