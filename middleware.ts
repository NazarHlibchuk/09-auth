import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//  Middleware за замовчуванням працює на Edge. Явно вкажемо для ревʼю:
export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPrivateRoute =
    pathname.startsWith('/notes') || pathname.startsWith('/profile');

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  //  приватні маршрути без жодних токенів → на логін
  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  //  немає access, але є refresh → пробуємо поновити сесію
  if (!accessToken && refreshToken) {
    try {
      // Викликаємо наш серверний ендпоінт сесії з форвардингом куків
      const refreshRes = await fetch(`${origin}/api/auth/session`, {
        method: 'GET',
        // важливо: прокидуємо вхідні кукі, щоб бек міг видати нові
        headers: {
          cookie: req.headers.get('cookie') ?? '',
        },
        // Edge runtime: credentials не працює як у браузері,
        // тому явно передаємо cookie через headers
      });

      if (refreshRes.ok) {
        // Створюємо відповідь (або редірект/next) і ДОДАЄМО set-cookie з бекенду
        const next = NextResponse.next();

      
        const setCookie = refreshRes.headers.get('set-cookie');
        if (setCookie) {
          // Якщо бек повертає кілька set-cookie, вони будуть через коми.
          // Append збереже їх у відповіді, щоб клієнт отримав нові токени.
          next.headers.append('set-cookie', setCookie);
        }

        // Якщо користувач йшов на /sign-in або /sign-up, після успішного поновлення
        // не пускаємо туди — редірект на головну
        if (isAuthRoute) {
          const redirect = NextResponse.redirect(new URL('/', req.url));
          if (setCookie) redirect.headers.append('set-cookie', setCookie);
          return redirect;
        }

        return next;
      } else {
        // refresh не спрацював → на логін
        return NextResponse.redirect(new URL('/sign-in', req.url));
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

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
  