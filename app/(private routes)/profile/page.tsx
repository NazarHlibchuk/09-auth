'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { useAuthStore } from '@/lib/store/authStore';
import css from '@/styles/ProfilePage.module.css';

// ✅ SEO meta-теги
export const metadata: Metadata = {
  title: 'Profile Page | NoteHub',
  description: 'View and manage your profile information on NoteHub.',
  openGraph: {
    title: 'Profile Page | NoteHub',
    description: 'Manage your personal details and avatar on NoteHub.',
    url: 'https://your-project.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Profile Page',
      },
    ],
  },
};

interface User {
  id: string;
  email: string;
  avatar?: string;
  name?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // якщо користувача немає в Zustand, отримуємо з API
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users/me');
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error(err);
        setError('You need to sign in first.');
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, router]);

  if (loading) return <div className={css.loader}>Loading...</div>;
  if (error) return <div className={css.error}>{error}</div>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={
              user?.avatar ||
              'https://ac.goit.global/fullstack/react/notehub-avatar.jpg'
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.name || 'Your username'}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
