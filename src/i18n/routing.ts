import { defineRouting } from 'next-intl/routing';

// Add a locale here, give it a label below and create messages/<locale>.json.
export const routing = defineRouting({
  locales: ['en', 'zh', 'ja', 'es'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];

// Display data for the language menu: pill label + native name.
export const localeMeta: Record<Locale, { short: string; native: string }> = {
  en: { short: 'EN', native: 'English' },
  zh: { short: '中', native: '中文' },
  ja: { short: '日', native: '日本語' },
  es: { short: 'ES', native: 'Español' },
};
