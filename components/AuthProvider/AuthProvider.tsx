'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    //  просто встановлюємо юзера, якщо сесія валідна
    checkSession()
      .then((data) => {
        if (data?.email) {
          setUser(data);
        } else {
          clearIsAuthenticated();
        }
      })
      .catch(() => clearIsAuthenticated());
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
