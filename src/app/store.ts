// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "@/features/hero/heroSlice";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
  },
});

// Типи для використання у всьому проєкті:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



