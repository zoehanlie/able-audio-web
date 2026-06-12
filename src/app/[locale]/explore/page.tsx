import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ExploreContent from '@/components/ExploreContent';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'explorePage' });
  return buildPageMetadata({
    locale,
    path: '/explore',
    title: t('eyebrow'),
    description: t('intro'),
  });
}

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ExploreContent />;
}
