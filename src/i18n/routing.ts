import { defineRouting } from 'next-intl/routing';

// The two locales. Add more here later (e.g. 'ja') and create messages/ja.json.
export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
});
