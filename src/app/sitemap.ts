import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { localizedPath, siteUrl } from '@/lib/seo';

const routes = ['', '/about', '/explore'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, route)}`,
      lastModified: now,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
