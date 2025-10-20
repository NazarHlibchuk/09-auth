import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import css from './edit/EditProfilePage.module.css';

//  Додаємо, щоб дозволити cookies → динамічний SSR
export const dynamic = 'force-dynamic';

//  SEO metadata
export const metadata: Metadata = {
  title: 'Profile | NoteHub',
};

//  серверний компонент
export default async function ProfilePage() {
  try {
    const user = await getMe();

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
    console.error('Profile load failed:', error);
    return (
      <main className={css.mainContent}>
        <p className={css.error}>Failed to load profile.</p>
      </main>
    );
  }
}
