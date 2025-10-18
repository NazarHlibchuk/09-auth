'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout as apiLogout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore(); // ✅ використовуємо logout зі store

  const handleLogout = async () => {
    try {
      await apiLogout(); // ✅ викликаємо logout на бекенді
      logout(); // ✅ очищаємо треба і в Zustand
      router.push('/sign-in');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Register
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );
}
