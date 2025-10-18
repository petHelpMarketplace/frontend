import { configureStore } from '@reduxjs/toolkit';
import heroReducer from '@/features/heroSection/hooks/heroSlice';
import { authReducer } from '@/features/auth/model/slice';
import accountReducer from '@/features/account/model/settingsSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {
  injectStore,
  setupAuthInterceptor,
} from '@/features/auth/api/authInterceptor';

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['accessToken', 'isLoggedIn'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    account: accountReducer,
    auth: persistedAuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Типи для використання у всьому проєкті:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
injectStore(store);
setupAuthInterceptor();
export const persistor = persistStore(store);
