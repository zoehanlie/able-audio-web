'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === 'en' ? 'zh' : 'en';
  return (
    <button
      className="lang-btn"
      aria-label="Switch language"
      onClick={() => router.replace(pathname, { locale: next })}
    >
      {locale === 'en' ? '中' : 'EN'}
    </button>
  );
}
