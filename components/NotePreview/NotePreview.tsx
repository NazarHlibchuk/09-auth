'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNote } from '@/lib/api';
import Modal from '../Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  noteId: string;
}

const NotePreview = ({ noteId }: NotePreviewProps) => {
  const router = useRouter();

  // Підвантажуємо нотатку по id
  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNote(noteId),
  });

  const handleClose = () => {
    router.back(); // повертаємось на попередню сторінку
  };

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !note) return <Modal onClose={handleClose}>Note not found</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.backBtn} onClick={handleClose}>
            Close
          </button>
        </div>
        <p className={css.content}>{note.content}</p>
        <span className={css.date}>{new Date(note.createdAt).toLocaleString()}</span>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
      </div>
    </Modal>
  );
};

export default NotePreview;
