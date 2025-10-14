"use client";

import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          {/* новий пункт меню — створення нотатки */}
          <li>
            <Link
              href="/notes/action/create"
              className={css.createButton}
              aria-label="Go to create note page"
            >
              + Create note
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
