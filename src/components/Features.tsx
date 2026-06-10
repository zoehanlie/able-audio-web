import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function Features() {
  const t = useTranslations('features');
  return (
    <section className="section" id="discover">
      <div className="wrap">
        <Reveal className="sec-head-row">
          <div>
            <div className="sec-tag">{t('tag')}</div>
            <h2 className="sec-title">{t('title')}</h2>
          </div>
          <p>{t('p')}</p>
        </Reveal>
        <div className="feat-grid">
          <Reveal><div className="feat">
            <div className="ic">⚡</div><h3>{t('f1h')}</h3><p>{t('f1p')}</p>
            <div className="tickrow"><span>{t('f1t1')}</span><span>{t('f1t2')}</span></div>
          </div></Reveal>
          <Reveal><div className="feat dark">
            <div className="ic">🎛️</div><h3>{t('f2h')}</h3><p>{t('f2p')}</p>
            <div className="tickrow"><span>{t('f2t1')}</span><span>{t('f2t2')}</span></div>
          </div></Reveal>
          <Reveal><div className="feat">
            <div className="ic">🔬</div><h3>{t('f3h')}</h3><p>{t('f3p')}</p>
            <div className="tickrow"><span>{t('f3t1')}</span><span>{t('f3t2')}</span></div>
          </div></Reveal>
          <Reveal><div className="feat"><div className="ic">🌫️</div><h3>{t('f4h')}</h3><p>{t('f4p')}</p></div></Reveal>
          <Reveal><div className="feat"><div className="ic">🎚️</div><h3>{t('f5h')}</h3><p>{t('f5p')}</p></div></Reveal>
          <Reveal><div className="feat"><div className="ic">✦</div><h3>{t('f6h')}</h3><p>{t('f6p')}</p></div></Reveal>
        </div>
      </div>
    </section>
  );
}
