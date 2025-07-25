// features/auth/model/selectors.ts

import type { RootState } from '@/app/store';

export const selectRegisterState = (state: RootState) => state.auth;

export const selectRegisterLoading = (state: RootState) => state.auth.loading;
export const selectRegisterSuccess = (state: RootState) => state.auth.success;
