import type { ReactNode } from "react";
import styles from "./LayoutNotes.module.css";

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function LayoutNotes({ children, sidebar }: LayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.notesWrapper}>{children}</div>
    </div>
  );
}
