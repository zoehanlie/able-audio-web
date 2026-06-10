'use client';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Check, Globe2 } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeMeta, type Locale } from '@/i18n/routing';

export default function LanguageMenu() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (next: Locale) => {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <div className="lang-menu" ref={ref}>
      <button
        className="lang-btn"
        aria-label="Select language"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <Globe2 className="lang-globe" size={15} strokeWidth={1.8} aria-hidden />
        {localeMeta[locale].short}
      </button>
      {open && (
        <div className="lang-pop" role="menu" aria-label="Languages">
          {routing.locales.map((l) => (
            <button
              key={l}
              role="menuitemradio"
              aria-checked={l === locale}
              className={`lang-opt${l === locale ? ' on' : ''}`}
              lang={l}
              onClick={() => select(l)}
            >
              {localeMeta[l].native}
              {l === locale && <Check className="tick" size={13} strokeWidth={2.6} aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
