'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import ErrorMessage from '@/components/Error/ErrorMessage';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Toaster } from 'react-hot-toast';
import type { NotesHTTPResponse } from '@/types/note';
import Link from 'next/link'; //  додаємо Link із Next.js
import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag = 'All' }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // debounce пошуковий запит
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  // скидання сторінки при зміні пошукового запиту
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tag]);

  const { data, isError, isSuccess } = useQuery<NotesHTTPResponse, Error>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => fetchNotes(tag, debouncedSearch, page),
    refetchOnMount: false,
    staleTime: 60_000,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        {/* замість модалки тепер посилання */}
        <Link
          href="/notes/action/create"
          className={css.button}
          aria-label="Go to create note page"
        >
          + Create note
        </Link>
      </header>

      {isError && <ErrorMessage text="Error loading notes" />}
      {!isError && notes.length === 0 && <ErrorMessage text="No notes found" />}
      {notes.length > 0 && <NoteList notes={notes} />}

      <Toaster />
    </div>
  );
}
