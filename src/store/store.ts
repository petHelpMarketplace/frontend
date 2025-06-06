// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import heroReducer from '@/features/hero/heroSlice';
import accountReducer from '@/features/account/model/settingsSlice';
import authReducer from '@/features/auth/model/authSlice';

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    account: accountReducer,
    auth: authReducer,
  },
});

// Типи для використання у всьому проєкті:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
