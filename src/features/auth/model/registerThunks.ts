import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  type RegisterRequest,
} from '@/features/auth/api/registerApi';
import type { RegisterResponse } from '@/features/auth/model/types';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: { message: string } }
>('registration/registerUser', async (data, thunkAPI) => {
  try {
    const result = await registerUserApi(data);
    return result;
  } catch (error) {
    let message = 'Registration failed';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof (error as { message?: unknown }).message === 'string'
    ) {
      message = (error as { message: string }).message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});
