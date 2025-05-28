import { useEffect, useState } from 'react';

/**
 * Базовий хук для обробки будь-якого CSS media query.
 * Повертає true, якщо media query задовольняється.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);

    handler(); // встановити початкове значення
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
}


