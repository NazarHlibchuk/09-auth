'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, updateMe } from '@/lib/api/clientApi'; //  Використовуємо clientApi
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //  Отримуємо юзера через clientApi
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!user) {
          const data = await getMe();
          setUser(data);
          setUsername(data.username);
        }
      } catch {
        router.push('/sign-in');
      }
    };
    loadUser();
  }, [user, setUser, router]);

  //  Зберігаємо зміни через updateMe з clientApi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const updatedUser = await updateMe({ username }); //  Виклик тільки через clientApi
      setUser(updatedUser); //  Оновлюємо глобальний стейт
      router.push('/profile'); //  Повертаємо на /profile
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push('/profile');

  if (!user) return <div className={css.loader}>Loading...</div>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || 'https://ac.goit.global/fullstack/default-avatar.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
