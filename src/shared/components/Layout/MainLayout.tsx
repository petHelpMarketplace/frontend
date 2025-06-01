import { Outlet } from 'react-router-dom';
import Footer from '@/shared/components/Layout/Footer/Footer';
import Header from '@/components/Header/Header';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/shared/components/ErrorFallback';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
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
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
