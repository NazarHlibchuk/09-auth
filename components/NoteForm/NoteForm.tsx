'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore'; //  новий store із persist
import type { NoteFormValues } from '@/types/note';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Отримуємо чернетку та дії з Zustand
  const { draft, setDraft, clearDraft } = useNoteStore();
  const { title, content, tag } = draft;

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft(); //  очищаємо чернетку після успішного створення
      router.back(); //  повертаємось на попередню сторінку
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     mutate({
       title,
       content,
       tag: tag as NoteFormValues['tag'],
      });
  };


  const handleCancel = () => {
    router.back(); //  просто повертаємось без очищення draft
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={css.form}
      aria-label="Create new note form"
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={title}
          onChange={(e) => setDraft({ title: e.target.value })} //  автозбереження
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={(e) => setDraft({ content: e.target.value })} //  автозбереження
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={(e) => setDraft({ tag: e.target.value })} //  автозбереження
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          aria-label="Cancel note creation"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
          aria-label="Submit new note"
        >
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
