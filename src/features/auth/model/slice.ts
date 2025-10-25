import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginSpec,
  logoutSpec,
  refreshAccessToken,
  registerSpec,
} from '@/features/auth/model/operations';
import { AuthState } from '@/features/auth/types/types';

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
  accessToken: null,
  loading: false,
  success: false,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerSpec.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerSpec.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.success = true;
        state.loading = false;
      })
      .addCase(registerSpec.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload ?? 'Registration failed';
      })
      .addCase(loginSpec.pending, state => {
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(loginSpec.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.isLoggedIn = true;
      })
      .addCase(loginSpec.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload ?? 'Login failed';
        state.isLoggedIn = false;
        state.accessToken = null;
      })
      .addCase(refreshAccessToken.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshAccessToken.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.accessToken = null;
      })
      .addCase(logoutSpec.pending, state => {
        state.loading = true;
      })
      .addCase(logoutSpec.fulfilled, () => initialState)
      .addCase(logoutSpec.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Logout failed';
      })
      .addMatcher(
        isAnyOf(
          registerSpec.fulfilled,
          registerSpec.rejected,
          loginSpec.fulfilled,
          loginSpec.rejected,
          logoutSpec.fulfilled,
          logoutSpec.rejected
        ),
        state => {
          state.loading = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
