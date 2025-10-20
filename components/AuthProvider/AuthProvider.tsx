'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const syncAuth = async () => {
      try {
        //  Спочатку перевіряємо сесію
        const session = await checkSession();

        if (session?.email) {
          
          const user = await getMe();
          setUser(user);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    };

    syncAuth();
  }, [setUser, logout]);

  return <>{children}</>;
}
