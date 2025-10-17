'use client';

import { api } from './api';
import type { User } from '@/types/user';

// ======================= //
//   AUTH
// ======================= //

//  Реєстрація нового користувача
export const register = async (body: { email: string; password: string }): Promise<User> => {
  const { data } = await api.post('/auth/register', body);
  return data;
};

//  Логін користувача
export const login = async (body: { email: string; password: string }): Promise<User> => {
  const { data } = await api.post('/auth/login', body);
  return data;
};

//  Вихід із системи
export const logout = async (): Promise<boolean> => {
  const res = await api.post('/auth/logout');
  return res.status === 200;
};

//  Перевірка активної сесії (через cookies)
export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await api.get('/auth/session');
    return data?.email ? data : null;
  } catch {
    return null;
  }
};

// ======================= //
//   USER
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
//   NOTES
// ======================= //

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}) => {
  const { data } = await api.get('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
