import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import css from './edit/EditProfilePage.module.css';

//  SEO metadata
export const metadata: Metadata = {
  title: 'Profile | NoteHub',
};

//  Це тепер серверний компонент (без "use client")
export default async function ProfilePage() {
  try {
    const user = await getMe();

    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            {/*  заміна <a> → Link */}
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
