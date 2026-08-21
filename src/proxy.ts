// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_COUNTRIES = new Set(
  (process.env.BLOCKED_COUNTRIES ?? '')
    .split(',')
    .map((country) => country.trim().toUpperCase())
    .filter(Boolean)
);

export function proxy(request: NextRequest) {
  const country = request.headers
    .get('x-vercel-ip-country')
    ?.trim()
    .toUpperCase();

  if (country && BLOCKED_COUNTRIES.has(country)) {
    return new NextResponse('Access denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt)$).*)',
  ],
};
