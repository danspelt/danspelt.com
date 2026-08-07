'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { VISITOR_PATH_IDS, getPathCta } from '@/data/visitor-paths';

const STORAGE_KEY = 'danspelt:visitor-path';

const VisitorPathContext = createContext(null);

/**
 * Holds the visitor's selected path for the session only.
 *
 * Privacy: the single path id is stored in sessionStorage so the page feels
 * responsive on scroll and navigation. Nothing is persisted beyond the tab
 * session and no profile is built.
 */
export function VisitorPathProvider({ children }) {
  const [path, setPath] = useState(null);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored && VISITOR_PATH_IDS.includes(stored)) setPath(stored);
    } catch {
      // sessionStorage can be unavailable (private mode, blocked storage).
    }
  }, []);

  const selectPath = useCallback((next) => {
    if (!VISITOR_PATH_IDS.includes(next)) return;
    setPath(next);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Selection still works for this render even if storage is blocked.
    }
  }, []);

  const value = useMemo(
    () => ({ path, selectPath, cta: getPathCta(path) }),
    [path, selectPath]
  );

  return <VisitorPathContext.Provider value={value}>{children}</VisitorPathContext.Provider>;
}

/**
 * Safe to call outside the provider: returns a null path and the default CTA so
 * components never crash if they are rendered standalone.
 */
export function useVisitorPath() {
  return (
    useContext(VisitorPathContext) ?? {
      path: null,
      selectPath: () => {},
      cta: getPathCta(null),
    }
  );
}
