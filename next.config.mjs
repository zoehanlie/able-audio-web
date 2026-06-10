import createNextIntlPlugin from 'next-intl/plugin';

// Points next-intl at the request config (loads the right message file per request)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep nodemailer (used by the contact Server Action) as a server-only
  // dependency instead of bundling it.
  serverExternalPackages: ['nodemailer'],
  // Images live in /public/images and are served + optimised by next/image.
  // When you move to remote images (CMS/S3) add their domains here.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
