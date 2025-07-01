import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  type RegisterRequest,
  type RegisterResponse,
} from '@/features/auth/api/registerApi';

interface BackendError {
  message?: string;
  details?: { field: string; message: string }[];
}

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: BackendError }
>('registration/registerUser', async (data, thunkAPI) => {
  try {
    const result = await registerUserApi(data);
    return result;
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return thunkAPI.rejectWithValue(error as BackendError);
    }
    return thunkAPI.rejectWithValue({ message: String(error) });
  }
});
