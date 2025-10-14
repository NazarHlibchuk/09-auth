import type { Note } from "./note";

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
  totalItems?: number;
}
