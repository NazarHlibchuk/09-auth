'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    
    checkSession()
      .then((data) => {
        if (data?.email) {
          setUser(data);
        } else {
          logout();
        }
      })
      .catch(() => logout());
  }, [setUser, logout]);

  return <>{children}</>;
}
