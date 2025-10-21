'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const syncAuth = async () => {
      try {
        // ✅ Перевіряємо сесію через наш backend
        const sessionRes = await fetch('/api/auth/session', { method: 'GET' });
        const sessionData = await sessionRes.json();

        if (!sessionData?.success) {
          logout();
          return;
        }

        // ✅ Якщо сесія валідна — отримуємо юзера
        const userRes = await fetch('/api/users/me');
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const user = await userRes.json();

        setUser(user);
      } catch {
        logout();
      }
    };

    syncAuth();
  }, [setUser, logout]);

  return <>{children}</>;
}
