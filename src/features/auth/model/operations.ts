import { createAsyncThunk } from '@reduxjs/toolkit';
import { petsHelpApi } from '@/shared/constants/api';
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/features/auth/types/types';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { RootState } from '@/app/store';

//TODO This will be changed once the CORS policy issue is resolved on the backend.
const setAuthHeader = (access_token: string) => {
  petsHelpApi.defaults.headers.common.Authorization = `Bearer ${access_token}`;
};

const clearAuthHeader = () => {
  petsHelpApi.defaults.headers.common.Authorization = '';
};

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
    console.log(
      'Auth header ',
      petsHelpApi.defaults.headers.common.Authorization
    );

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
  // #TODO delete log
  console.log('[refreshAccessToken] started');

  try {
    const response = await petsHelpApi.post<RefreshResponse>('/token/refresh');
    // #TODO delete log
    console.log('refresh', response.data);

    return response.data;
  } catch (e) {
    // #TODO delete log
    console.log('[refreshAccessToken] error:', e);
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export const logoutSpec = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      // #TODO delete log
      console.log(
        'Auth header before logout:',
        petsHelpApi.defaults.headers.common.Authorization
      );

      await petsHelpApi.post('/specialist/logout');
      clearAuthHeader();
    } catch (e: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(e));
    }
  }
);
