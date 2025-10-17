import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//  універсальна функція для SSR-запитів із cookie
const serverApi = (cookies?: string) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies || '',
    },
    withCredentials: true,
  });

// ----------- NOTES -----------
export const fetchNotes = async (
  params?: { search?: string; page?: number; tag?: string },
  cookies?: string
) => {
  const { data } = await serverApi(cookies).get('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string, cookies?: string) => {
  const { data } = await serverApi(cookies).get(`/notes/${id}`);
  return data;
};

// ----------- USER -----------
export const getMe = async (cookies?: string) => {
  const { data } = await serverApi(cookies).get('/users/me');
  return data;
};

export const checkSession = async (cookies?: string) => {
  const { data } = await serverApi(cookies).get('/auth/session');
  return data;
};
