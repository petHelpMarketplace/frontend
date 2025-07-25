import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@/features/auth/model/operations';
import { AuthState } from '@/features/auth/types/types';

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
  access_token: null,
  refresh_token: null,
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
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
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

export const { resetRegisterState } = authSlice.actions;
export const authReducer = authSlice.reducer;
