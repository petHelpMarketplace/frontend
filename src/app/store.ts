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
import { specInfoReducer } from '@/features/account/model/slice';

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['accessToken', 'isLoggedIn'],
};

const specInfoPersistConfig = {
  key: 'specInfo',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSpecInfoReducer = persistReducer(
  specInfoPersistConfig,
  specInfoReducer
);

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    account: accountReducer,
    auth: persistedAuthReducer,
    specInfo: persistedSpecInfoReducer,
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
