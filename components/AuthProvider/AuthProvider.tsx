'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Loading from '@/app/loading';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await checkSession();
        if (data?.email) {
          setUser(data);
        } else {
          clearIsAuthenticated();
        }
      } catch (err) {
        console.error('AuthProvider error:', err);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return <Loading />;

  //  Якщо користувач неавторизований і це приватний маршрут — редірект
  if (!isAuthenticated && window.location.pathname.startsWith('/notes')) {
    router.push('/sign-in');
    return null;
  }

  return <>{children}</>;
}
