'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Loading from '@/app/loading'; 

export default function PrivateLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data?.email) {
            setUser(data);
          } else {
            router.replace('/sign-in');
          }
        } else {
          router.replace('/sign-in');
        }
      } catch {
        router.replace('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      checkSession();
    } else {
      setLoading(false);
    }
  }, [user, router, setUser]);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <main>{children}</main>
      {modal}
      <Footer />
    </>
  );
}
