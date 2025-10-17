import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sessionToken'); 

  const isPrivate = req.nextUrl.pathname.startsWith('/notes') || req.nextUrl.pathname.startsWith('/profile');
  const isAuthRoute = req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/sign-up');

  //  Якщо користувач неавторизований — редірект на логін
  if (isPrivate && !token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  //  Якщо користувач вже авторизований — редірект на профіль
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
