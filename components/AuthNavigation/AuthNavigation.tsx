'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from '@/styles/AuthNavigation.module.css'; 

export default function AuthNavigation() {
  const router = useRouter();
  const { user, logout, setUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout(); // очищаємо стан користувача у Zustand
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // 🔹 Якщо користувач авторизований
  if (user) {
    return (
      <div className={css.wrapper}>
        <span className={css.userEmail}>👋 {user.email}</span>
        <Link href="/profile" className={css.link}>
          Profile
        </Link>
        <button onClick={handleLogout} className={css.button}>
          Logout
        </button>
      </div>
    );
  }

  // 🔹 Якщо користувач не авторизований
  return (
    <div className={css.wrapper}>
      <Link href="/auth/login" className={css.link}>
        Sign In
      </Link>
      <Link href="/auth/register" className={css.button}>
        Sign Up
      </Link>
    </div>
  );
}
