'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import LanguageMenu from './LanguageMenu';

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  // Root the in-page anchors at the home route so the header also works from
  // sub-pages like /about (where these sections don't exist).
  const home = `/${locale}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  const Logo = ({ onClick }: { onClick?: () => void }) => (
    <a href={`${home}#top`} className="logo-img-link" onClick={onClick}>
      <Image src="/images/logoAsset 14.avif" alt="Able Audio Tech" width={120} height={40} priority style={{ height: 40, width: 'auto' }} />
    </a>
  );

  return (
    <>
      <nav className="nav">
        <div className="wrap nav-inner">
          <Logo />
          <div className="nav-links">
            <a href={`${home}#top`}>{t('home')}</a>
            {/* <a href={`${home}#discover`}>{t('discover')}</a> Discover section hidden */}
            {/* <a href={`${home}#product`}>{t('product')}</a> Product section hidden */}
            {/* <a href={`${home}#craft`}>{t('craft')}</a> Craft section hidden */}
            <a href={`${home}/explore`}>{t('explore')}</a>
            <a href={`${home}/about`}>{t('about')}</a>
            <a href={`${home}#contact`}>{t('contact')}</a>
          </div>
          <div className="nav-cta">
            <LanguageMenu />
            <button
              className="menu-btn"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              {open ? <X size={24} strokeWidth={2} aria-hidden /> : <Menu size={24} strokeWidth={2} aria-hidden />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`drawer-overlay${open ? ' open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <aside className={`drawer${open ? ' open' : ''}`} aria-label="Mobile navigation">
        <div className="drawer-head">
          <Logo onClick={close} />
          <button className="drawer-close" aria-label="Close menu" onClick={close}><X size={18} strokeWidth={2} aria-hidden /></button>
        </div>

        <nav className="drawer-links">
          <a href={`${home}#top`} onClick={close}>{t('home')}</a>
          {/* <a href={`${home}#discover`} onClick={close}>{t('discover')}</a> Discover section hidden */}
          {/* <a href={`${home}#product`} onClick={close}>{t('product')}</a> Product section hidden */}
          {/* <a href={`${home}#craft`} onClick={close}>{t('craft')}</a> Craft section hidden */}
          <a href={`${home}/explore`} onClick={close}>{t('explore')}</a>
          <a href={`${home}/about`} onClick={close}>{t('about')}</a>
          <a href={`${home}#contact`} onClick={close}>{t('contact')}</a>
        </nav>

        <div className="drawer-foot">
          <LanguageMenu />
        </div>
      </aside>
    </>
  );
}
