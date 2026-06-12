import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Features from '@/components/Features';
import Lifestyle from '@/components/Lifestyle';
// import Spotlight from '@/components/Spotlight'; // Product section hidden
import Craft from '@/components/Craft';
import AboutTech from '@/components/AboutTech';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    title: 'Next-Generation Electrostatic Speakers',
    description:
      'Experience Able Audio Tech electrostatic speakers: ultra-coated diaphragms, patented electrode design, fast response and transparent high-fidelity sound.',
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <Lifestyle />
      {/* <Spotlight /> Product section hidden */}
      <Craft />
      <AboutTech />
      <Reviews />
      <Contact />
    </>
  );
}
