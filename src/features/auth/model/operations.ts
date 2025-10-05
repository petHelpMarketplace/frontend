import { createAsyncThunk } from '@reduxjs/toolkit';
import { petsHelpApi } from '@/shared/constants/api';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/features/auth/types/types';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

//TODO This will be changed once the CORS policy issue is resolved on the backend.
const setAuthHeader = (access_token: string) => {
  petsHelpApi.defaults.headers.common.Authorization = `Bearer ${access_token}`;
};

const clearAuthHeader = () => {
  petsHelpApi.defaults.headers.common.Authorization = '';
};

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
    return thunkAPI.rejectWithValue(getErrorMessage(e));
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
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await petsHelpApi.post('specialist/logout');
      clearAuthHeader();
    } catch (e: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(e));
    }
  }
);
