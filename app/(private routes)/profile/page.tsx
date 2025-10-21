import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
};

export default async function ProfilePage() {
  try {
    // ✅ Тепер беремо юзера через наш серверний API маршрут
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      cache: 'no-store', // важливо, щоб не кешувалося
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }

    const user = await res.json();

    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
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
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className={css.mainContent}>
        <p className={css.error}>Failed to load profile.</p>
      </main>
    );
  }
}
