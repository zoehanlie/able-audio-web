import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// Detects the locale (URL, then Accept-Language header) and redirects
// "/" -> "/en" or "/zh". Runs before every matched request.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and anything with a file extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
