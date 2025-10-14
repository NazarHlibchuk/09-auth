// types/api.ts
import { Note } from "./note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
  totalItems?: number;
}
