// 🚧 TEMPORARILY DISABLED MIDDLEWARE FOR DEPLOY DEBUG 🚧
// Це потрібно, щоб деплой на Vercel не зависав

import type { NextRequest } from 'next/server';

export function middleware(_req: NextRequest) {
  // тимчасово нічого не робимо
  return;
}

// Вимикаємо matcher
export const config = {
  matcher: [],
};
