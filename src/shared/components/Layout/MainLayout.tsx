import { Outlet } from 'react-router-dom';
import Footer from '@/shared/components/Layout/Footer/Footer';
import Header from '@/shared/components/Layout/Header/Header';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/shared/components/ErrorFallback';
import { Toaster } from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // 'PUSH' | 'REPLACE' | 'POP'

   // щоб не скролити двічі в StrictMode по тому ж ключу
  const lastKeyRef = useRef<string>('');

  useEffect(() => {
    // ключ навігації (URL без хешу, бо хеш обробляємо окремо)
    const key = pathname + search + '|' + navType;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    // ❗ опціонально: пропустити глобальний скрол для певного роута
    // якщо ти керуєш ним локально на сторінці списку:
    // if (pathname === '/specialists') return;

    if (navType === 'POP') {
      // Back/Forward — нічого не робимо (даємо відновитись історії/локальній логіці)
      return;
    }

    // Якщо є #якір — скролимо до нього, інакше — вгору
    requestAnimationFrame(() => {
      if (hash) {
        const id = hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          // якщо у тебе фіксований Header — додай CSS на таргети:
          // .anchorTarget { scroll-margin-top: var(--header-height); }
          el.scrollIntoView({ block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [pathname, search, hash, navType]);

  return null;
}
const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <ScrollManager />
        {/* TODO: Remove console.log and improve error handling in production */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={error => {
            // For errors log
            console.error('Помилка у Boundary:', error);
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
          <Toaster
            toastOptions={{ className: 'text-center', duration: 5000 }}
          />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
