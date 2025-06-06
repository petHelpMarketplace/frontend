import '@/components/App/App.css';
import { lazy, useEffect } from 'react';
import '@/app/App.css';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import MainLayout from '@/shared/components/Layout/MainLayout';
import { useAppDispatch } from '@/shared/hooks/index';
import { login } from '@/features/auth/model/authSlice';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const SearchSpecialistsPage = lazy(
  () => import('@/features/searchSpecialists/pages/SearchSpecialistsPage')
);
const SpecialistProfilePage = lazy(
  () => import('@/features/specialist/pages/SpecialistProfilePage')
);
const BookingPage = lazy(() => import('@/features/booking/pages/BookingPage'));
const ReviewServicePage = lazy(
  () => import('@/features/review/pages/ReviewServicePage')
);

const AccountPage = lazy(() => import('@/features/account/pages/AccountPage'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Тимчасова авторизація при завантаженні сторінки
    dispatch(login('demo'));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/specialists" element={<SearchSpecialistsPage />} />
          <Route path="/specialists/:id" element={<SpecialistProfilePage />} />
          <Route path="/specialists/:id/booking" element={<BookingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/review/specialists/:id"
            element={<ReviewServicePage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
