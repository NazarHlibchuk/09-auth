// app/not-found.tsx
import type { Metadata } from "next";
import styles from "./not-found.module.css";

// 🔹 SEO + Open Graph
export const metadata: Metadata = {
  title: "Сторінку не знайдено — NoteHub",
  description: "На жаль, сторінки, яку ви шукаєте, не існує або вона була видалена.",
  openGraph: {
    title: "Сторінку не знайдено — NoteHub",
    description: "Ця сторінка не існує або була видалена. Поверніться на головну.",
    url: "https://08-zustand-psi-jet.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404 — Сторінку не знайдено</h1>
      <p className={styles.description}>
        Вибачте, але сторінки, яку ви шукаєте, не існує.
      </p>
    </div>
  );
}
