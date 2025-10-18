'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  //  refresher для auth flow
  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}
