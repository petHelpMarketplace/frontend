import { createAsyncThunk } from '@reduxjs/toolkit';
import { petsHelpApi } from '@/shared/constants/api';
import { RegisterRequest, RegisterResponse } from '@/features/auth/model/types';
import { AxiosError } from 'axios';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (credentials, thunkAPI) => {
  // console.log(credentials);
  try {
    const response = await petsHelpApi.post<RegisterResponse>(
      '/specialist/register',
      credentials
    );
    // console.log(response);

    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || error.message || 'Unknown error';
    // console.log(message);

    return thunkAPI.rejectWithValue(message);
  }
});
