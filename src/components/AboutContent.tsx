import { useTranslations, useLocale } from 'next-intl';
import { Check, Diamond, Ruler, Volume2, Zap, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import CountUp from './CountUp';
import DiaphragmViz from './DiaphragmViz';
import ChannelsViz from './ChannelsViz';
import HybridViz from './HybridViz';

export default function AboutContent() {
  const t = useTranslations('aboutPage');
  const locale = useLocale();

  // Gradient-highlight the last word of the title (no-op for languages without spaces).
  const title = t('title');
  const sp = title.lastIndexOf(' ');
  const titleHead = sp > 0 ? title.slice(0, sp + 1) : '';
  const titleTail = sp > 0 ? title.slice(sp + 1) : title;

  const designCards: Array<{ Icon: LucideIcon; h: string; p: string }> = [
    { Icon: Zap, h: t('d1h'), p: t('d1p') },
    { Icon: Volume2, h: t('d2h'), p: t('d2p') },
    { Icon: Ruler, h: t('d3h'), p: t('d3p') },
  ];
  const diaphragmFeatures = [t('diaF1'), t('diaF2'), t('diaF3'), t('diaF4')];
  const panelFeatures = [t('panelF1'), t('panelF2'), t('panelF3'), t('panelF4')];

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

      {/* ===== 01 — The Company ===== */}
      <section className="ap-sec ap-company">
        <div className="ap-geo" aria-hidden>
          <span className="geo-grid" />
          <span className="geo geo-ring dashed g1" />
          <span className="geo geo-square g2" />
          <span className="geo geo-hex g3" />
          <span className="geo geo-tri g4" />
          <span className="geo geo-square g5" />
          <span className="geo geo-ring g6" />
        </div>
        <div className="wrap ap-company-grid">
          <Reveal className="ap-company-aside">
            <div className="ap-eyebrow">{t('companyTag')}</div>
            <h2>{t('companyH')}</h2>
            <div className="ap-stats">
              <div className="ap-stat"><CountUp className="num" value={t('cs1n')} /><div className="lbl">{t('cs1l')}</div></div>
              <div className="ap-stat"><CountUp className="num" value={t('cs2n')} /><div className="lbl">{t('cs2l')}</div></div>
              <div className="ap-stat"><CountUp className="num" value={t('cs3n')} /><div className="lbl">{t('cs3l')}</div></div>
            </div>
          </Reveal>
          <Reveal className="ap-company-body">
            <p>{t('companyP1')}</p>
            <p>{t('companyP2')}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== 02 — Design ===== */}
      <section className="ap-sec ap-tech">
        <div className="wrap ap-split flip">
          <Reveal>
            <div className="ap-eyebrow">{t('designTag')}</div>
            <h2>{t('designH')}</h2>
            <p className="ap-lead">{t('designP1')}</p>
            <p>{t('designP2')}</p>
            <ul className="ap-design-list">
              {designCards.map((c, i) => (
                <li key={i}>
                  <span className="ic"><c.Icon size={20} strokeWidth={1.8} aria-hidden /></span>
                  <div><b>{c.h}</b><span>{c.p}</span></div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="ap-visual">
            <span className="tagtop"><Diamond size={12} strokeWidth={2} aria-hidden />{t('designTag')}</span>
            <HybridViz />
            <span className="cap">{t('designCap')}</span>
          </Reveal>
        </div>
      </section>

      {/* ===== Electrostatic Diaphragm ===== */}
      <section className="ap-sec ap-tech">
        <div className="wrap ap-split">
          <Reveal>
            <div className="ap-eyebrow">{t('diaTag')}</div>
            <h2>{t('diaH')}</h2>
            <p className="ap-lead">{t('diaLead')}</p>
            <p>{t('diaP1')}</p>
            <p>{t('diaP2')}</p>
            <ul className="ap-feats">
              {diaphragmFeatures.map((feature) => (
                <li key={feature}><span className="chk"><Check size={13} strokeWidth={3} aria-hidden /></span>{feature}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="ap-visual">
            <span className="tagtop"><Diamond size={12} strokeWidth={2} aria-hidden />{t('diaTag')}</span>
            <DiaphragmViz />
            <span className="cap">{t('diaCap')}</span>
          </Reveal>
        </div>
      </section>

      {/* ===== Composite Side Panel ===== */}
      <section className="ap-sec ap-tech">
        <div className="wrap ap-split flip">
          <Reveal>
            <div className="ap-eyebrow">{t('panelTag')}</div>
            <h2>{t('panelH')}</h2>
            <p className="ap-lead">{t('panelLead')}</p>
            <p>{t('panelP1')}</p>
            <p>{t('panelP2')}</p>
            <ul className="ap-feats">
              {panelFeatures.map((feature) => (
                <li key={feature}><span className="chk"><Check size={13} strokeWidth={3} aria-hidden /></span>{feature}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="ap-visual">
            <span className="tagtop"><Diamond size={12} strokeWidth={2} aria-hidden />{t('panelTag')}</span>
            <ChannelsViz />
            <span className="cap">{t('panelCap')}</span>
          </Reveal>
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
