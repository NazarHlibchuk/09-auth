'use client';

import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation" className={css.nav}>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <TagsMenu />
          </li>

          <li>
            <Link
              href="/notes/action/create"
              className={css.createButton}
              aria-label="Go to create note page"
            >
              + Create note
            </Link>
          </li>

          {/* ✅ Забираємо зайвий <li> */}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
