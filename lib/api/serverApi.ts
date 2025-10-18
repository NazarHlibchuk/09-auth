import { cookies } from 'next/headers';
import { serverApiInstance } from './axiosInstance';
import type { NotesHTTPResponse } from '@/types/note';

import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { AxiosResponse } from 'axios';

// ✅ Тепер async
async function authHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

// ----------- NOTES -----------
export const fetchNotes = async (
  params?: { search?: string; page?: number; tag?: string }
): Promise<NotesHTTPResponse> => {
  const headers = await authHeaders();
  const res = await serverApiInstance.get('/notes', {
    params,
    headers,
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await authHeaders();
  const res = await serverApiInstance.get(`/notes/${id}`, { headers });
  return res.data;
};

// ----------- USER -----------
export const getMe = async (): Promise<User> => {
  const headers = await authHeaders();
  const res = await serverApiInstance.get('/users/me', { headers });
  return res.data;
};

// ----------- AUTH -----------
export const checkSession = async (): Promise<AxiosResponse> => {
  const headers = await authHeaders();
  return await serverApiInstance.get('/auth/session', { headers });
};
