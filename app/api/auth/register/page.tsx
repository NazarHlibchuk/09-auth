'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from '@/styles/SignUpPage.module.css'; // ✅ твій файл

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed');
      }

      const user = await res.json();
      setUser(user);
      router.push('/notes');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Sign Up</h1>

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

          <label className={css.label}>
            Password
            <input
              type="password"
              className={css.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label className={css.label}>
            Confirm Password
            <input
              type="password"
              className={css.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className={css.error}>{error}</p>}

          <button type="submit" className={css.button} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className={css.text}>
          Already have an account?{' '}
          <a href="/auth/login" className={css.link}>
            Sign In
          </a>
        </p>
      </div>
    </main>
  );
}
