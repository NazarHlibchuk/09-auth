'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ALL_TAGS } from '@/types/note';
import css from './TagsMenu.module.css';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {ALL_TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              All notes
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
