import { useTranslations } from 'next-intl';
import { Check, FlaskConical, SlidersHorizontal, SlidersVertical, Sparkles, Waves, Zap } from 'lucide-react';
import Reveal from './Reveal';

export default function Features() {
  const t = useTranslations('features');
  const features = [
    {
      Icon: Zap,
      h: t('f1h'),
      p: t('f1p'),
      ticks: [t('f1t1'), t('f1t2')],
    },
    {
      Icon: SlidersHorizontal,
      h: t('f2h'),
      p: t('f2p'),
      ticks: [t('f2t1'), t('f2t2')],
      dark: true,
    },
    {
      Icon: FlaskConical,
      h: t('f3h'),
      p: t('f3p'),
      ticks: [t('f3t1'), t('f3t2')],
    },
    { Icon: Waves, h: t('f4h'), p: t('f4p') },
    { Icon: SlidersVertical, h: t('f5h'), p: t('f5p') },
    { Icon: Sparkles, h: t('f6h'), p: t('f6p') },
  ];

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
          {features.map(({ Icon, h, p, ticks, dark }) => (
            <Reveal key={h}><div className={`feat${dark ? ' dark' : ''}`}>
              <div className="ic"><Icon size={23} strokeWidth={1.8} aria-hidden /></div><h3>{h}</h3><p>{p}</p>
              {ticks && (
                <div className="tickrow">
                  {ticks.map((tick) => (
                    <span key={tick}><Check className="tick-icon" size={12} strokeWidth={3} aria-hidden />{tick}</span>
                  ))}
                </div>
              )}
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
