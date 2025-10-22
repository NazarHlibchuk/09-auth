// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  //  Якщо немає токенів і це приватний маршрут
  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  //  Якщо accessToken немає, але є refreshToken — оновлюємо сесію
  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();
      const setCookie = session.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
      }
    } catch {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  //  Заборонити авторизованим заходити на /sign-in або /sign-up
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  //  Дозволити доступ в усіх інших випадках
  return NextResponse.next();
}

//  Matcher для приватних і auth маршрутів
export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};

