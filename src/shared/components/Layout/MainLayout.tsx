import { Outlet } from 'react-router-dom';
import Footer from '@/shared/components/Layout/Footer/Footer';
import Header from '@/shared/components/Layout/Header/Header';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/shared/components/ErrorFallback';
import { Toaster } from 'react-hot-toast';
import ScrollManager from '@/shared/components/ScrollManager';
import Spinner from '../UI/Spinner/Spinner';

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
          <Suspense fallback={<Spinner />}>
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
