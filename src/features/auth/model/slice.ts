import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '@/features/auth/model/operations';
import { AuthState } from '@/features/auth/model/types';

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  success: false,
  error: null,
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
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? 'Registration failed';
      });
  },
});

export const { resetRegisterState } = authSlice.actions;
export const authReducer = authSlice.reducer;
