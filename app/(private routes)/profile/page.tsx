'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from '@/styles/ProfilePage.module.css'; 

interface User {
  id: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // якщо користувача немає в Zustand, пробуємо отримати сесію
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users/me');
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error(err);
        setError('You need to sign in first.');
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, router]);

  if (loading) return <div className={css.loader}>Loading...</div>;
  if (error) return <div className={css.error}>{error}</div>;

  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Profile</h1>

        <div className={css.infoBlock}>
          <p className={css.label}>User ID:</p>
          <p className={css.value}>{user?.id}</p>

          <p className={css.label}>Email:</p>
          <p className={css.value}>{user?.email}</p>
        </div>

        <button
          className={css.editButton}
          onClick={() => router.push('/profile/edit')}
        >
          Edit Profile
        </button>
      </div>
    </main>
  );
}
