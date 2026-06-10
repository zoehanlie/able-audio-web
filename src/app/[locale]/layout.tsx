import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono, Noto_Sans_TC, Noto_Sans_JP } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import '../globals.css';

// Self-hosted Google fonts -> exposed as CSS variables used in globals.css
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-bricolage', display: 'swap' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-hanken', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-jetbrains', display: 'swap' });
const notoTC = Noto_Sans_TC({ subsets: ['latin'], weight: ['400', '500', '700', '900'], variable: '--font-noto-tc', display: 'swap' });
const notoJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700', '900'], variable: '--font-noto-jp', display: 'swap' });

export const metadata: Metadata = {
  title: 'Able Audio Tech | electrostatic speaker',
  description: 'Next-generation electrostatic speakers with an in-house ultra-coated diaphragm and patented electrode design.',
  icons: {
    icon: '/images/favicon.jpeg',
  },
};

// Pre-render every locale at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const fontVars = `${bricolage.variable} ${hanken.variable} ${jetbrains.variable} ${notoTC.variable} ${notoJP.variable}`;
  // globals.css consumes the generic --font-noto; point it at the right CJK face.
  const cjkVar = { '--font-noto': locale === 'ja' ? 'var(--font-noto-jp)' : 'var(--font-noto-tc)' } as React.CSSProperties;

  return (
    <html lang={locale === 'zh' ? 'zh-Hant' : locale} className={fontVars} style={cjkVar}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
