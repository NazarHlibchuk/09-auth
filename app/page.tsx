import Link from "next/link";
import css from "../components/Home/Home.module.css";

export default function Page() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub</h1>

      <p className={css.description}>
        NoteHub is a simple and efficient application for managing personal
        notes. Keep your thoughts organized and accessible in one place — at
        home or on the go.
      </p>

      <p className={css.description}>
        Enjoy a clean interface for writing, editing, and browsing notes.
        With powerful search and tag-based filtering, NoteHub helps you stay
        productive and focused.
      </p>

      <Link href="/notes/filter/All" className={css.button}>
        Go to Notes →
      </Link>
    </main>
  );
}
