import { api } from './api';
import type { User } from '@/types/user';

// ======================= //
//        AUTH
// ======================= //

export const register = async (body: { email: string; password: string }): Promise<User> => {
  const { data } = await api.post('/auth/register', body);
  return data;
};

export const login = async (body: { email: string; password: string }): Promise<User> => {
  const { data } = await api.post('/auth/login', body);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const { data } = await api.get('/auth/session');
    return !!data?.success;
  } catch {
    return false;
  }
};

// ======================= //
//        USER
// ======================= //

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateMe = async (body: Partial<User>): Promise<User> => {
  const { data } = await api.patch('/users/me', body);
  return data;
};

// ======================= //
//        NOTES
// ======================= //

export const fetchNotes = async (params?: { search?: string; page?: number; tag?: string }) => {
  const { data } = await api.get('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (body: { title: string; content: string; tag: string }) => {
  const { data } = await api.post('/notes', body);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
