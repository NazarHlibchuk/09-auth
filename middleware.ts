import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ✅ Edge runtime (вимагає ревʼю)
export const runtime = 'edge';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // ❗ ВАЖЛИВО: не запускати middleware на API/Static — додатковий захист
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPrivateRoute =
    pathname.startsWith('/notes') || pathname.startsWith('/profile');

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  // ❌ приватні маршрути — без токенів не пускаємо
  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // ♻️ Якщо accessToken прострочений, але є refreshToken — пробуємо оновити
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(`${origin}/api/auth/session`, {
        method: 'GET',
        headers: { cookie: req.headers.get('cookie') ?? '' },
      });

      if (refreshRes.ok) {
        const next = NextResponse.next();
        const setCookie = refreshRes.headers.get('set-cookie');
        if (setCookie) next.headers.append('set-cookie', setCookie);

        if (isAuthRoute) {
          const redirect = NextResponse.redirect(new URL('/', req.url));
          if (setCookie) redirect.headers.append('set-cookie', setCookie);
          return redirect;
        }

        return next;
      } else {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // ✅ Автентифікованих не пускаємо на сторінки авторизації
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// ✅ Головне — виключити API маршрути з matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
