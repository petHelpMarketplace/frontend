import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '@/features/auth/model/registerThunks';
import type { RegisterState } from '@/features/auth/model/types';

const initialState: RegisterState = {
  loading: false,
  success: false,
};

const registerSlice = createSlice({
  name: 'registration',
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
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, state => {
        state.loading = false;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
