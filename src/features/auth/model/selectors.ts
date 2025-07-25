// features/auth/model/selectors.ts

import type { RootState } from '@/app/store';

// export const selectRegisterState = (state: RootState) => state.auth;

export const selectAuthLoading = (state: RootState) => state.auth.loading;
// export const selectAuthSuccess = (state: RootState) => state.auth.success;
// export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
