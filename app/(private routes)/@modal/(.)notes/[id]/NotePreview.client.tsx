'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from "@/app/notes/[id]/NoteDetails.module.css";

interface NotePreviewProps {
  noteId: string;
  onClose?: () => void;
}

export default function NotePreview({ noteId, onClose }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose?.();
    router.back();
  };

  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNote(noteId),
    refetchOnMount: false,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !note) return <Modal onClose={handleClose}>Error loading note</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
        <button className={css.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
