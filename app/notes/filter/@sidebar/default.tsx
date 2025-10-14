// app/notes/filter/@sidebar/default.tsx
import Link from "next/link";
import css from "./SidebarNotes.module.css";
import type { NoteTag } from "@/types/note";

const TAGS: (NoteTag | "All")[] = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <nav>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
