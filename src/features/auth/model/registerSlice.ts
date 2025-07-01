import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './registerThunks';
import type {
  BackendFieldError,
  RegisterState,
} from '@/features/auth/model/types';

const initialState: RegisterState = {
  loading: false,
  success: false,
  message: null,
  errors: null,
};

const registerSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegisterState(state) {
      state.loading = false;
      state.success = false;
      state.message = null;
      state.errors = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.errors = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
        state.errors = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload?.message || 'Помилка реєстрації';
        if (Array.isArray(action.payload?.details)) {
          const errors: Record<string, string> = {};
          action.payload.details.forEach((item: BackendFieldError) => {
            errors[item.field] = item.message;
          });
          state.errors = errors;
        } else {
          state.errors = null;
        }
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
