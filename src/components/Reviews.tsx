import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function Reviews() {
  const t = useTranslations('reviews');
  const items = [
    { p: t('r1p'), role: t('r1role'), av: 'D', name: 'David C.' },
    { p: t('r2p'), role: t('r2role'), av: 'P', name: 'Priya N.' },
    { p: t('r3p'), role: t('r3role'), av: 'M', name: 'Marco V.' },
  ];
  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <Reveal className="sec-head-row">
          <div>
            <div className="sec-tag">{t('tag')}</div>
            <h2 className="sec-title">{t('title')}</h2>
          </div>
          <p>{t('p')}</p>
        </Reveal>
        <div className="rev-grid">
          {items.map((r) => (
            <Reveal key={r.name}><div className="rev">
              <div className="stars">★★★★★</div>
              <p>{r.p}</p>
              <div className="rev-by"><div className="av">{r.av}</div><div className="who"><b>{r.name}</b><span>{r.role}</span></div></div>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
