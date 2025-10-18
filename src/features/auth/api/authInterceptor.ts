import { store } from '@/app/store';
import { petsHelpApi } from '@/shared/api/petsHelpApi';
import { setAuthHeader } from '../lib/authHeader';
import { logoutSpec, refreshAccessToken } from '../model/operations';

let reduxStore: typeof store;

export const injectStore = (_store: typeof store) => {
  reduxStore = _store;
};

export const setupAuthInterceptor = () => {};
// Додаємо інтерсептор до відповіді API
petsHelpApi.interceptors.response.use(
  response => response, // Якщо відповідь успішна — повертаємо її без змін

  async error => {
    const originalRequest = error.config; // Зберігаємо оригінальний запит

    // Якщо помилка 401 (токен недійсний) і ми ще не пробували оновити
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Встановлюємо прапорець, щоб уникнути циклів

      try {
        // Питаємо бекенд на новий access token через refresh токен у cookie
        const result = await reduxStore.dispatch(refreshAccessToken());

        // Якщо оновлення успішне
        if (refreshAccessToken.fulfilled.match(result)) {
          const newAccessToken = result.payload.access_token;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          setAuthHeader(newAccessToken); // Оновлюємо токен в заголовках axios

          // Повторюємо оригінальний запит з новим токеном
          return petsHelpApi(originalRequest);
        }
      } catch (err) {
        // #TODO Тут можна додати logout, редірект на login і т.п.
        console.error('Token refresh failed:', err);
        reduxStore.dispatch(logoutSpec());
        window.location.href = '/';
      }
    }

    // Якщо не 401 або токен не оновився — просто повертаємо помилку
    return Promise.reject(error);
  }
);
