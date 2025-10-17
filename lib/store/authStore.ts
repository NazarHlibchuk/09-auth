import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // 🟢 Зберігаємо користувача після логіну
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      //  Очищаємо стан при логауті
      clearIsAuthenticated: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      //  Альтернатива clearIsAuthenticated для зручності
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // ключ у localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
