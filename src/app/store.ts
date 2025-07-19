// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import heroReducer from '@/features/heroSection/hooks/heroSlice';
import registerReducer from '@/features/auth/model/registerSlice';

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    registration: registerReducer,
  },
});

// Типи для використання у всьому проєкті:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
