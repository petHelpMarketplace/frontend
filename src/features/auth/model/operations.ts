import { createAsyncThunk } from '@reduxjs/toolkit';
import { petsHelpApi } from '@/shared/constants/api';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/features/auth/types/types';
import { AxiosError } from 'axios';

const setAuthHeader = (access_token: string) => {
  petsHelpApi.defaults.headers.common.Authorization = `Bearer ${access_token}`;
};

// const clearAuthHeader = () => {
//   petsHelpApi.defaults.headers.common.Authorization = '';
// };

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await petsHelpApi.post<RegisterResponse>(
      '/specialist/register',
      credentials
    );

    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || error.message || 'Unknown error';

    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (credentials: LoginRequest, thunkAPI) => {
  try {
    const response = await petsHelpApi.post<LoginResponse>(
      '/specialist/login',
      credentials
    );

    setAuthHeader(response.data.access_token);
    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || error.message || 'Unknown error';

    return thunkAPI.rejectWithValue(message);
  }
});
