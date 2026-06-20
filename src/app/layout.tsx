import { CookieConsentManagerMount } from '@/components/lib/CookieConsentManagerMount';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const appUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
if (
  !process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.NODE_ENV === 'production'
) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL is not set. Copy .env.example to .env.local and configure it.'
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: 'Contrastly – Tailwind CSS Color Contrast Checker | Sola Studio',
  description:
    'Use Contrastly to check WCAG color contrast between Tailwind CSS colors, custom hex values, and semantic color tokens in your browser.',
  openGraph: {
    title: 'Contrastly – Tailwind CSS Color Contrast Checker | Sola Studio',
    description:
      'Check WCAG color contrast between Tailwind CSS colors, custom hex values, and semantic color tokens with Contrastly.',
    url: appUrl,
    siteName: 'Contrastly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contrastly – Tailwind CSS Color Contrast Checker | Sola Studio',
    description:
      'Check WCAG color contrast between Tailwind CSS colors, custom hex values, and semantic color tokens with Contrastly.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <CookieConsentManagerMount />
        {children}
      </body>
    </html>
  );
}
