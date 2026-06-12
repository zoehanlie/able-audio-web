import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ableaudiotech.com';
export const siteName = 'Able Audio Tech';

export const defaultDescription =
  'Next-generation electrostatic speakers with an in-house ultra-coated diaphragm and patented electrode design.';

export const ogImage = '/images/room.jpg';

export function localizedPath(locale: string, path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function languageAlternates(path = '') {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedPath(locale, path)])
  ) as Record<Locale, string>;
}

export function buildPageMetadata({
  locale,
  path = '',
  title,
  description = defaultDescription,
}: {
  locale: string;
  path?: string;
  title: string;
  description?: string;
}): Metadata {
  const pathname = localizedPath(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName,
      locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 670,
          alt: 'Able Audio Tech electrostatic speaker',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
