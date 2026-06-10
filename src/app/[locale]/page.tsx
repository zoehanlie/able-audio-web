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
