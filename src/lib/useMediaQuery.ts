import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia(query);

    // Initial reflection
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mql.addEventListener('change', handler);

    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [query]);

  // Avoid hydration mismatch
  return mounted ? matches : false;
}
