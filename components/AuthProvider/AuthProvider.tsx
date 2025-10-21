'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const syncAuth = async () => {
      try {
        const isValid = await checkSession(); //  Перевіряємо сесію
        if (!isValid) {
          logout();
          return;
        }

        //  отримуємо дані користувача після підтвердження сесії
        const user = await getMe();
        setUser(user);
      } catch {
        logout();
      }
    };

    syncAuth();
  }, [setUser, logout]);

  return <>{children}</>;
}
