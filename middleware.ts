import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ✅ Vercel вимагає так
export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // ✅ Захист від циклів — важливо!
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPrivateRoute = pathname.startsWith('/notes') || pathname.startsWith('/profile');
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

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
      }
    } catch {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// ✅ Обовʼязково, щоб middleware не запускався на API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
