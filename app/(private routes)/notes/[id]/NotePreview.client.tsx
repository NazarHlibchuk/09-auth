'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => router.back(); // ← повертає на попередній маршрут

  if (isLoading) {
    return <Modal onClose={handleClose}>Loading...</Modal>;
  }

  if (isError || !note) {
    return <Modal onClose={handleClose}>Error loading note.</Modal>;
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
        <button onClick={handleClose} className={css.closeButton}>Close</button>
      </div>
    </Modal>
  );
}
