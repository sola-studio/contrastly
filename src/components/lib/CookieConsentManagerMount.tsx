'use client';

import { CookieConsentManager } from '@/components/lib/CookieConsentManager';

export function CookieConsentManagerMount() {
  if (process.env.NODE_ENV === 'development') return null;
  return <CookieConsentManager />;
}
