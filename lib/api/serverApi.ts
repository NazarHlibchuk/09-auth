import { cookies } from 'next/headers';
import { serverApiInstance } from './axiosInstance';
import type { Note, NotesHTTPResponse } from '@/types/note';
import type { User } from '@/types/user';
import type { AxiosResponse } from 'axios';

//  Повертаємо сирі cookies в заголовку Cookie
async function cookieHeaders(): Promise<Record<'Cookie', string> | undefined> {
  const jar = await cookies();
  const accessToken = jar.get('accessToken')?.value;
  const refreshToken = jar.get('refreshToken')?.value;

  const parts: string[] = [];
  if (accessToken) parts.push(`accessToken=${accessToken}`);
  if (refreshToken) parts.push(`refreshToken=${refreshToken}`);

  return parts.length ? { Cookie: parts.join('; ') } : undefined;
}

// ----------- NOTES -----------
export const fetchNotes = async (
  params?: { search?: string; page?: number; tag?: string }
): Promise<NotesHTTPResponse> => {
  const headers = await cookieHeaders();
  const res = await serverApiInstance.get<NotesHTTPResponse>('/notes', {
    params,
    headers,
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await cookieHeaders();
  const res = await serverApiInstance.get<Note>(`/notes/${id}`, { headers });
  return res.data;
};

// ----------- USER -----------
export const getMe = async (): Promise<User> => {
  const headers = await cookieHeaders();
  const res = await serverApiInstance.get<User>('/users/me', { headers });
  return res.data;
};

// ----------- AUTH -----------
export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const headers = await cookieHeaders();
  //  повертаємо повний AxiosResponse, як вимагає завдання
  return await serverApiInstance.get<User>('/auth/session', { headers });
};
