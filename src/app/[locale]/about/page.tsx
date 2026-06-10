import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import AboutContent from '@/components/AboutContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return {
    title: t('eyebrow'),
    description: t('intro'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
