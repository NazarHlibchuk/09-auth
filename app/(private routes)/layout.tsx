'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/lib/api/clientApi'; //  новий бекенд API
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
  const { user, setUser, clearIsAuthenticated } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const data = await checkSession(); //  тепер через clientApi

        if (data?.email) {
          setUser(data);
        } else {
          clearIsAuthenticated();
          router.replace('/sign-in');
        }
      } catch (err) {
        console.error('Auth session error:', err);
        clearIsAuthenticated();
        router.replace('/sign-in');
      } finally {
        setChecking(false);
      }
    };

    // Якщо користувача немає — перевіряємо сесію на бекенді
    if (!user) {
      verifySession();
    } else {
      setChecking(false);
    }
  }, [user, router, setUser, clearIsAuthenticated]);

  if (checking) return <Loading />;

  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      {modal}
      <Footer />
    </>
  );
}
