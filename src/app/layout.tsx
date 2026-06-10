import type { ReactNode } from 'react';

// Root layout is intentionally minimal: the real <html>/<body> are rendered
// in app/[locale]/layout.tsx so the lang attribute can match the locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
