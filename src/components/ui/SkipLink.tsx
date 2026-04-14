import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--accent)] focus:text-[var(--bg)] focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-none transition-all"
    >
      Salta al contenuto principale
    </a>
  );
};
