'use client';

import css from './EmptyState.module.css';

const EmptyState = () => {
  return <div className={css.empty}>No notes found.</div>;
};

export default EmptyState;
