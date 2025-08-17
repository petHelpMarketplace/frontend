import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@/features/auth/model/operations';
import { AuthState } from '@/features/auth/types/types';

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
  accessToken: null,
  refreshToken: null,
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
    logout: state => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload ?? 'Registration failed';
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.isLoggedIn = false;
        state.error = action.payload ?? 'Login failed';
      })
      .addMatcher(
        isAnyOf(
          registerUser.fulfilled,
          registerUser.rejected,
          loginUser.fulfilled,
          loginUser.rejected
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

export const { resetRegisterState, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
