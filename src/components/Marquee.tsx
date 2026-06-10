import { useTranslations } from 'next-intl';

export default function Marquee() {
  const t = useTranslations('marquee');
  const items = [t('i1'), t('i2'), t('i3'), t('i4'), t('i5')];
  const Row = () => (
    <span>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 46 }}>
          {i === 1 ? <b>{it}</b> : it}<i className="dotsep">●</i>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track"><Row /><Row /></div>
    </div>
  );
}
