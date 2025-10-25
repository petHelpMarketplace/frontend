import { store } from '@/app/store';
import { petsHelpApi } from '@/shared/api/petsHelpApi';
import { setAuthHeader } from '../lib/authHeader';
import { logoutSpec, refreshAccessToken } from '../model/operations';

type AppStore = typeof store;
let reduxStore: AppStore | undefined;

export const injectStore = (_store: typeof store) => {
  reduxStore = _store;
};

export const setupAuthInterceptor = () => {
  // Додаємо інтерсептор до відповіді API
  petsHelpApi.interceptors.response.use(
    response => response, // Якщо відповідь успішна — повертаємо її без змін

    async error => {
      if (!reduxStore) return Promise.reject(error);

      // Зберігаємо оригінальний запит і позначку повтору
      const originalRequest = (error.config ?? {}) as typeof error.config & {
        _retry?: boolean;
      };

      // Якщо помилка 401 (токен недійсний) і ми ще не пробували оновити
      const url = originalRequest.url ?? '';
      const isRefresh = url.includes('/token/refresh');
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isRefresh
      ) {
        originalRequest._retry = true; // Встановлюємо прапорець, щоб уникнути циклів

        try {
          // Питаємо бекенд на новий access token через refresh токен у cookie
          const result = await reduxStore.dispatch(refreshAccessToken());

          // Якщо оновлення успішне
          if (refreshAccessToken.fulfilled.match(result)) {
            const newAccessToken = result.payload.access_token;
            (originalRequest.headers ??= {}).Authorization =
              `Bearer ${newAccessToken}`;
            setAuthHeader(newAccessToken); // Оновлюємо токен в заголовках axios

            // Повторюємо оригінальний запит з новим токеном
            return petsHelpApi(originalRequest);
          }
          // refresh rejected: локальний логаут і редірект
          await reduxStore.dispatch(logoutSpec());
          window.location.href = '/';
          return Promise.reject(error);
        } catch (err) {
          // #TODO Тут можна додати logout, редірект на login і т.п.
          console.error('Token refresh failed:', err);
          await reduxStore.dispatch(logoutSpec());
          window.location.href = '/';
          return Promise.reject(error);
        }
      }

      // Якщо не 401 — просто повертаємо помилку
      return Promise.reject(error);
    }
  );
};
