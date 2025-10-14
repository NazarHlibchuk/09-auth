export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export const ALL_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface UpdateNoteParams {
  title?: string;
  content?: string;
  tag?: NoteTag;
}

export interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}
