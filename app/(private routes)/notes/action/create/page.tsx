// app/notes/action/create/page.tsx
import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Створення нової нотатки — NoteHub",
  description: "Додайте нову нотатку або збережіть чернетку у NoteHub.",
  openGraph: {
    title: "Створення нової нотатки — NoteHub",
    description: "Створіть або збережіть чернетку своєї нотатки у NoteHub.",
    url: "https://08-zustand-psi-jet.vercel.app/notes/action/create", 
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
