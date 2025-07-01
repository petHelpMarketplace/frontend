// features/auth/model/selectors.ts

import type { RootState } from '@/app/store';

export const selectRegisterState = (state: RootState) => state.registration;

export const selectRegisterLoading = (state: RootState) =>
  state.registration.loading;
export const selectRegisterSuccess = (state: RootState) =>
  state.registration.success;
export const selectRegisterMessage = (state: RootState) =>
  state.registration.message;
export const selectRegisterError = (state: RootState) =>
  state.registration.errors;
