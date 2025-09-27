import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // 'PUSH' | 'REPLACE' | 'POP'
  const lastKeyRef = useRef<string>(''); // уникаємо дублю в StrictMode

  // Вимикаємо нативне відновлення скролу
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = prev || 'auto';
      };
    }
  }, []);

  useEffect(() => {
    const key = `${pathname}${search}${hash}|${navType}`;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    // Сторінка списку керує скролом сама
    if (pathname === '/specialists') return;

    // Решта сторінок — зверху або до якоря
    requestAnimationFrame(() => {
      if (hash) {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [pathname, search, hash, navType]);

  return null;
}
