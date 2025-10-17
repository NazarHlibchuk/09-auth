'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';



export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/sign-in'); // ✅ оновлений шлях
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to update profile');
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      setSuccess(true);

      //  коротка затримка перед поверненням
      setTimeout(() => router.push('/profile'), 1200);
     } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.editCard}>
        <h1 className={css.title}>Edit Profile</h1>

        <form onSubmit={handleSubmit} className={css.form}>
          <label className={css.label}>
            Email
            <input
              type="email"
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {error && <p className={css.error}>{error}</p>}
          {success && (
            <p className={css.success}>Profile updated successfully!</p>
          )}

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>

            <button type="submit" className={css.saveButton} disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

