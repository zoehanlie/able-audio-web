import { useTranslations, useLocale } from 'next-intl';
import Reveal from './Reveal';
import FaceOff from './FaceOff';
import TradSpeakerIllo from './TradSpeakerIllo';
import EsPanelIllo from './EsPanelIllo';

export default function ExploreContent() {
  const t = useTranslations('explorePage');
  const locale = useLocale();

  // Gradient-highlight the last word of the title (no-op for languages without spaces).
  const title = t('title');
  const sp = title.lastIndexOf(' ');
  const titleHead = sp > 0 ? title.slice(0, sp + 1) : '';
  const titleTail = sp > 0 ? title.slice(sp + 1) : title;

  return (
    <main className="ap" id="top">
      {/* ===== Hero ===== */}
      <section className="ap-hero">
        <div className="ap-hero-decor" aria-hidden>
          <i /><i /><i />
        </div>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow"><span className="sq" />{t('eyebrow')}</span>
            <h1>{titleHead}<span className="hl">{titleTail}</span></h1>
            <p>{t('intro')}</p>
            <div className="ap-scroll">
              <span>{t('scroll')}</span>
              <span className="arr" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 01 — Traditional distortion ===== */}
      <section className="ap-sec ap-tech">
        <div className="wrap ap-split">
          <Reveal>
            <div className="ap-eyebrow">{t('s1Tag')}</div>
            <h2>{t('s1H')}</h2>
            <p className="ap-lead">{t('s1P')}</p>
            <div className="xp-cause">
              <h3>{t('s1d1H')}</h3>
              <p>{t('s1d1P')}</p>
            </div>
            <div className="xp-cause">
              <h3>{t('s1d2H')}</h3>
              <p>{t('s1d2P')}</p>
            </div>
          </Reveal>
          <Reveal className="ap-visual xp-trad-visual">
            <TradSpeakerIllo />
          </Reveal>
        </div>
      </section>

      {/* ===== 02 — Electrostatic principle (placeholder) ===== */}
      <section className="ap-sec ap-tech">
        <div className="wrap ap-split flip">
          <Reveal>
            <div className="ap-eyebrow">{t('s2Tag')}</div>
            <h2>{t('s2H')}</h2>
            <p className="ap-lead">{t('s2P')}</p>
            <div className="xp-cause">
              <p>{t('s2p1')}</p>
            </div>
            <div className="xp-cause">
              <p>{t('s2p2')}</p>
            </div>
          </Reveal>
          <Reveal className="ap-visual xp-es-visual">
            <EsPanelIllo />
          </Reveal>
        </div>
      </section>

      {/* ===== 03 — Head to head: the interactive comparison ===== */}
      <section className="ap-sec xp-versus">
        <div className="wrap">
          <Reveal>
            <div className="ap-eyebrow">{t('s3Tag')}</div>
            <h2>{t('s3H')}</h2>
            <p className="ap-lead xp-versus-lead">{t('s3Lead')}</p>
          </Reveal>
          <FaceOff />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="ap-cta-wrap">
        <div className="wrap">
          <Reveal className="ap-cta">
            <div className="ap-cta-decor" aria-hidden><i /><i /><i /><i /></div>
            <h2>{t('ctaH')}</h2>
            <p>{t('ctaP')}</p>
            <div className="ap-cta-btns">
              <a href={`/${locale}#contact`} className="btn btn-ink">{t('ctaBtn')} →</a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
