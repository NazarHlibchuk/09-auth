"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface Props {
  noteId: string;
}

export default function NoteDetails({ noteId }: Props) {
  const router = useRouter();
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Error loading note</div>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
        <button className={css.backBtn} onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
}
