import '@/app/App.css';
import { lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import MainLayout from '@/shared/components/Layout/MainLayout';
import PrivateRoute from '@/features/auth/components/PrivateRoute';
import { useAppSelector } from '@/shared/hooks';
import {
  selectAccessToken,
  selectIsRefreshing,
} from '@/features/auth/model/selectors';
import { clearAuthHeader, setAuthHeader } from '@/features/auth/lib/authHeader';

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
const AccountPersonalDataForm = lazy(
  () =>
    import('@/features/account/components/personalData/AccountPersonalDataForm')
);
const AccountServicesForm = lazy(
  () => import('@/features/account/components/services/AccountServicesForm')
);
const PortfolioGallery = lazy(
  () => import('@/features/account/components/portfolio/PortfolioGallery')
);
const AccountSettingsForm = lazy(
  () => import('@/features/account/components/settings/AccountSettingsForm')
);
const SupportPage = lazy(() => import('@/features/support/pages/SupportPage'));
const FaqPage = lazy(() => import('@/features/faq/pages/FaqPage'));
const FaqQuestionPage = lazy(
  () => import('@/features/faq/pages/FaqQuestionPage')
);
const PrivacyPolicyPage = lazy(
  () => import('@/features/privacyPolicy/pages/PrivacyPolicyPage')
);
const PublicOfferPage = lazy(
  () => import('@/features/publicOffer/pages/PublicOfferPage')
);

function App() {
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (accessToken) {
      setAuthHeader(accessToken);
    } else {
      clearAuthHeader();
    }
  }, [accessToken]);

  return isRefreshing ? null : (
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
        >
          <Route index element={<Navigate to="info" replace />} />
          <Route path="info" element={<AccountPersonalDataForm />} />
          <Route path="services" element={<AccountServicesForm />} />
          <Route path="portfolio" element={<PortfolioGallery />} />
          <Route path="settings" element={<AccountSettingsForm />} />
        </Route>
        <Route path="/review/specialists/:id" element={<ReviewServicePage />} />

        {/* Footer */}
        <Route path="/support" element={<SupportPage />} />

        {/* FAQ */}
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/faq/:category/:id" element={<FaqQuestionPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        <Route path="/public-offer" element={<PublicOfferPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
