import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginSpec,
  logoutSpec,
  refreshAccessToken,
  // refreshSpec,
  registerSpec,
} from '@/features/auth/model/operations';
import { AuthState } from '@/features/auth/types/types';

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
  // specProfile: {
  //   id: null,
  //   name: null,
  //   family_name: null,
  //   email: null,
  //   avatar_url: null,
  //   bio: null,
  //   description: null,
  //   experience: null,
  //   is_active: false,
  //   is_verified: false,
  //   phone: null,
  //   position: null,
  // },
  accessToken: null,
  // refreshToken: null,
  loading: false,
  success: false,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegisterState(state) {
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerSpec.pending, state => {
        state.loading = true;
        state.success = false;
      })
      .addCase(registerSpec.fulfilled, (state, action) => {
        state.id = action.payload.id;
        // state.specProfile = {
        //   ...state.specProfile,
        //   id: Number(action.payload.id),
        // };

        state.success = true;
      })
      .addCase(registerSpec.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload ?? 'Registration failed';
      })
      .addCase(loginSpec.pending, state => {
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(loginSpec.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        // state.refreshToken = action.payload.refresh_token;

        state.isLoggedIn = true;
      })
      .addCase(loginSpec.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload ?? 'Login failed';
      })
      .addCase(refreshAccessToken.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        // state.specProfile = action.payload;
        state.accessToken = action.payload.access_token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshAccessToken.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logoutSpec.pending, state => {
        state.loading = true;
      })
      .addCase(logoutSpec.fulfilled, () => initialState)
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
    //   .addMatcher(isAnyOf(register.rejected, login.rejected, logout.rejected), state => {
    //     state.isLoggedIn = false;
    //   });
  },
});

export const { resetRegisterState } = authSlice.actions;
export const authReducer = authSlice.reducer;
