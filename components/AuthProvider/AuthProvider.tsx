'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        //  Спочатку перевіряємо сесію
        const session = await checkSession();

        if (!session?.email) {
          logout();
          return;
        }

        //  Потім отримуємо повного користувача
        const user = await getMe();
        setUser(user);
      } catch {
        logout();
      }
    };

    initAuth();
  }, [setUser, logout]);

  return <>{children}</>;
}
