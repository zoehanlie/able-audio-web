import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function Spotlight() {
  const t = useTranslations('spot');
  return (
    <section className="section spotlight spot" id="product">
      <div className="wrap spot-grid">
        <Reveal className="spot-img">
          <span className="ribbon">{t('ribbon')}</span>
          <Image src="/images/spk.jpg" alt="Flagship hybrid electrostatic speaker" width={408} height={612} sizes="(max-width:980px) 80vw, 420px" />
        </Reveal>
        <Reveal>
          <div className="sec-tag">{t('tag')}</div>
          <h2>{t('h')}</h2>
          <p className="spot-sub">{t('p')}</p>
          <div className="spec-table">
            <div><div className="k">{t('k1')}</div><div className="v"><em>{t('v1em')}</em>{t('v1rest')}</div></div>
            <div><div className="k">{t('k2')}</div><div className="v">{t('v2')}</div></div>
            <div><div className="k">{t('k3')}</div><div className="v">{t('v3')}</div></div>
            <div><div className="k">{t('k4')}</div><div className="v">{t('v4')}</div></div>
            <div><div className="k">{t('k5')}</div><div className="v">{t('v5')}</div></div>
            <div><div className="k">{t('k6')}</div><div className="v">{t('v6')}</div></div>
          </div>
          <div className="spot-foot">
            <a href="#contact" className="btn btn-yellow">{t('btn1')} →</a>
            <a href="#contact" className="btn" style={{ background: 'transparent', color: 'var(--paper)', borderColor: '#555' }}>{t('btn2')}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
