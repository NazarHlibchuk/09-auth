'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import { usePathname, useRouter } from 'next/navigation';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const deleteNoteMutation = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  const openNoteModal = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  if (!notes || notes.length === 0) {
    return (
      <div className={css.emptyState}>
        <h3>No notes found</h3>
        <p>Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isDeleting =
          deleteNoteMutation.isPending &&
          deleteNoteMutation.variables === note.id;

        return (
          <li key={note.id} className={css.listItem}>
            <div
              className={css.clickable}
              role="button"
              tabIndex={0}
              onClick={() => openNoteModal(note.id)}
              onKeyDown={(e) => e.key === 'Enter' && openNoteModal(note.id)}
            >
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>
                {note.content.length > 120
                  ? note.content.slice(0, 120) + '…'
                  : note.content}
              </p>
            </div>

            <div className={css.footer}>
              <span className={css.tag}>{note.tag || 'No tag'}</span>

              <button
                className={css.button}
                onClick={(e) => {
                  e.stopPropagation(); //  щоб не відкривалось модалка при кліку на "Delete"
                  handleDelete(note.id);
                }}
                disabled={isDeleting}
                aria-label={`Delete note titled ${note.title}`}
              >
                {isDeleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
