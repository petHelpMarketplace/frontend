import { createAsyncThunk } from '@reduxjs/toolkit';
import { petsHelpApi } from '@/shared/api/petsHelpApi';
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/features/auth/types/types';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { RootState } from '@/app/store';
import { clearAuthHeader, setAuthHeader } from '../lib/authHeader';

export const registerSpec = createAsyncThunk<
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
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export const loginSpec = createAsyncThunk<
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
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export const refreshAccessToken = createAsyncThunk<
  RefreshResponse,
  void,
  { state: RootState; rejectValue: string }
>('auth/refreshAccessToken', async (_, thunkAPI) => {
  try {
    const response = await petsHelpApi.post<RefreshResponse>('/token/refresh');

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export const logoutSpec = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await petsHelpApi.post('/specialist/logout', undefined, {
        signal: thunkAPI.signal,
      });
    } catch (e: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(e));
    } finally {
      clearAuthHeader();
    }
  }
);
