import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Reveal from './Reveal';
import CountUp from './CountUp';

export default function AboutTech() {
  const t = useTranslations('about');

  const stats = [
    { n: t('s1n'), l: t('s1l') },
    { n: t('s2n'), l: t('s2l') },
    { n: t('s3n'), l: t('s3l') },
    { n: t('s4n'), l: t('s4l') },
  ];

  return (
    <section className="section tech" id="about">
      {/* Animated decor: emanating sonar rings + drifting dots */}
      <div className="about-decor" aria-hidden>
        <i /><i /><i /><i />
        <b style={{ top: '16%', left: '7%' }} />
        <b style={{ top: '64%', left: '34%', animationDelay: '1.4s' }} />
        <b style={{ top: '30%', left: '78%', animationDelay: '.7s' }} />
      </div>

      <div className="wrap about-inner">
        <Reveal className="about-head">
          <div className="sec-tag">{t('tag')}</div>
          <h2>{t('h')}</h2>
          <p>{t('p')}</p>
        </Reveal>

        <Reveal>
          <div className="about-stats">
            {stats.map((s, i) => (
              <div className="about-stat" key={i}>
                <CountUp className="num" value={s.n} />
                <div className="lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="about-foot">
          <Link href="/about" className="about-more">
            {t('more')} <span className="arr">→</span>
          </Link>
          <span className="about-lab">● {t('lab')}</span>
        </Reveal>
      </div>
    </section>
  );
}
