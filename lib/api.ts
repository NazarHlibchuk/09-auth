import axios from "axios";
import type {
  Note,
  NoteFormValues,
  UpdateNoteParams,
  NotesHTTPResponse,
} from "@/types/note";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";

  
axios.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Отримати всі нотатки (tag, search, pagination)
export const fetchNotes = async (
  tag = "All",
  search = "",
  page = 1
): Promise<NotesHTTPResponse> => {
  const params: Record<string, string | number> = { page, perPage: 12 };

  // 🔹 якщо є пошук — передаємо тільки search
  if (search.trim()) {
    params.search = search.trim();
  }
  // 🔹 якщо тег відмінний від "All" — додаємо у запит
  else if (tag && tag !== "All") {
    params.tag = tag.trim();
  }

  const resp = await axios.get<NotesHTTPResponse>("/notes", { params });
  const data = resp.data;

  return {
    notes: data.notes || [],
    totalPages: data.totalPages || 1,
    totalNotes: data.totalNotes ?? (data.notes ? data.notes.length : 0),
  };
};

// ✅ Отримати одну нотатку
export const fetchNote = async (id: string): Promise<Note> => {
  const resp = await axios.get<Note>(`/notes/${id}`);
  return resp.data;
};

// ✅ Створити нову нотатку
export const createNote = async (payload: NoteFormValues): Promise<Note> => {
  const resp = await axios.post<Note>("/notes", payload);
  return resp.data;
};

// ✅ Оновити нотатку
export const updateNote = async (
  id: string,
  payload: UpdateNoteParams
): Promise<Note> => {
  const resp = await axios.patch<Note>(`/notes/${id}`, payload);
  return resp.data;
};

// ✅ Видалити нотатку
export const deleteNote = async (id: string): Promise<Note> => {
  const resp = await axios.delete<Note>(`/notes/${id}`);
  return resp.data;
};

// ✅ Отримати всі унікальні теги
export const getTags = async (): Promise<string[]> => {
  const resp = await fetchNotes("All", "", 1);
  const tagsSet = new Set(resp.notes.map((n) => n.tag).filter(Boolean));
  return Array.from(tagsSet);
};
