import '@/app/App.css';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import MainLayout from '@/shared/components/Layout/MainLayout';
import PrivateRoute from '@/features/auth/components/PrivateRoute';

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
const FaqPage = lazy(() => import('@/features/faq/pages/FaqPage'));
const FaqQuestionPage = lazy(
  () => import('@/features/faq/pages/FaqQuestionPage')
);
const PublicOfferPage = lazy(
  () => import('@/features/publicOffer/pages/PublicOfferPage')
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/specialists" element={<SearchSpecialistsPage />} />
        <Route path="/specialists/:id" element={<SpecialistProfilePage />} />
        <Route path="/specialists/:id/booking" element={<BookingPage />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />
        <Route path="/review/specialists/:id" element={<ReviewServicePage />} />
        <Route path="/public-offer" element={<PublicOfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
