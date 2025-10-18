import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from './lib/api/serverApi';

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPrivateRoute =
    req.nextUrl.pathname.startsWith('/notes') ||
    req.nextUrl.pathname.startsWith('/profile');

  const isAuthRoute =
    req.nextUrl.pathname.startsWith('/sign-in') ||
    req.nextUrl.pathname.startsWith('/sign-up');

  // Якщо користувач на приватному маршруті без токенів — редірект на sign-in
  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Якщо немає accessToken, але є refreshToken — пробуємо оновити сесію
  if (!accessToken && refreshToken) {
    try {
      await checkSession(); // оновить cookies, якщо refreshToken валідний
    } catch {
      // refreshToken недійсний
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // Якщо авторизований — не пускати на sign-in / sign-up
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', req.url)); // ✅ має бути редірект на головну
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
