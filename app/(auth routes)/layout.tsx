'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // refresh тільки при першому вході на auth-сторінки
    router.refresh();

  }, []); //  важливо: порожній масив залежностей, без router в залежностях

  return <>{children}</>;
}
