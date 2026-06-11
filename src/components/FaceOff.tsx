import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import EsSpeakerIllo from './EsSpeakerIllo';
import TradSpeakerIllo from './TradSpeakerIllo';

// Centre-divided comparison, laid out after the brand reference deck:
// electrostatic on the left, traditional on the right, with the three quality
// categories (細緻度 / 清晰度 / 純淨度) bridging a vertical divider. The panel
// illustration sits behind the electrostatic side as a faint watermark. All
// motion is CSS keyed off Reveal's .in class — divider draws down, titles
// unblur, rows slide in from each side.
const CATS = [
  { k: 'c1', es: ['c1e1', 'c1e2'], trad: ['c1t1', 'c1t2'] },
  { k: 'c2', es: ['c2e1', 'c2e2'], trad: ['c2t1', 'c2t2'] },
  { k: 'c3', es: ['c3e1', 'c3e2', 'c3e3'], trad: ['c3t1', 'c3t2', 'c3t3'] },
] as const;

export default function FaceOff() {
  const t = useTranslations('explorePage');

  return (
    <div className="xp-fo-main">
      <div className="xp-fo-bg" aria-hidden>
        <EsSpeakerIllo />
      </div>
      <div className="xp-fo-bg r" aria-hidden>
        <TradSpeakerIllo />
      </div>

      <Reveal className="xp-fo-head">
        <h4 className="es">{t('esName')}</h4>
        <span className="vbar" />
        <h4>{t('tradName')}</h4>
      </Reveal>
      {CATS.map((c) => (
        <Reveal key={c.k} className="xp-fo-cat">
          <h5 className="xp-fo-title">{t(c.k)}</h5>
          {c.es.map((ek, i) => (
            <div className="xp-fo-row" key={ek}>
              <p className="es" style={{ transitionDelay: `${0.3 + 0.14 * i}s` }}>{t(ek)}</p>
              <span className="vbar" style={{ transitionDelay: `${0.12 * i}s` }} />
              <p style={{ transitionDelay: `${0.38 + 0.14 * i}s` }}>{t(c.trad[i])}</p>
            </div>
          ))}
        </Reveal>
      ))}
    </div>
  );
}
