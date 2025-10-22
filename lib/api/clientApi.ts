// lib/api/clientApi.ts
import { api } from './api';
import type { User } from '@/types/user';
import type { Note, NoteFormValues, NotesHTTPResponse } from '@/types/note';

// ======================= //
//        AUTH
// ======================= //

export const register = async (
  body: { email: string; password: string }
): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', body);
  return data;
};

export const login = async (
  body: { email: string; password: string }
): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', body);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  try {
    await api.get('/auth/session');
    return true;
  } catch {
    return false;
  }
};

// ======================= //
//        USER
// ======================= //

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (
  body: { username: string }
): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', body);
  return data;
};

// ======================= //
//        NOTES
// ======================= //

export const fetchNotes = async (
  params?: { search?: string; page?: number; tag?: string }
): Promise<NotesHTTPResponse> => {
  const { data } = await api.get<NotesHTTPResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (body: NoteFormValues): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', body);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
