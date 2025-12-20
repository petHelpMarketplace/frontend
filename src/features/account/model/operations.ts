import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AvatarRequest,
  AvatarResponse,
  PatchProfileRequest,
  SpecInfoResponse,
} from '../types/types';
import { petsHelpApi } from '@/shared/api/petsHelpApi';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { RootState } from '@/app/store';
import { setAuthHeader } from '@/features/auth/lib/authHeader';

export const getSpecInfo = createAsyncThunk<
  SpecInfoResponse,
  void,
  { state: RootState; rejectValue: string }
>('getSpecInfo', async (_, thunkAPI) => {
  try {
    const savedRToken = thunkAPI.getState().auth.accessToken;
    if (!savedRToken) {
      return thunkAPI.rejectWithValue(getErrorMessage('Token is not exist'));
    }
    setAuthHeader(savedRToken);
    const response = await petsHelpApi.get('/specialist/me');
    // console.log(response.data);

    return response.data;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export const patchSpecProfile = createAsyncThunk<
  SpecInfoResponse,
  PatchProfileRequest,
  { state: RootState; rejectValue: string }
>('patchSpecProfile', async (dataToSend, thunkAPI) => {
  try {
    const savedRToken = thunkAPI.getState().auth.accessToken;
    if (!savedRToken) {
      return thunkAPI.rejectWithValue(getErrorMessage('Token is not exist'));
    }
    setAuthHeader(savedRToken);
    const response = await petsHelpApi.patch('/specialist/profile', dataToSend);
    // console.log('patch', response.data.data);

    return response.data.data;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export const postSpecAvatar = createAsyncThunk<
  AvatarResponse,
  AvatarRequest,
  { state: RootState; rejectValue: string }
>('spec/avatar', async (data: AvatarRequest, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('file', data.file);

    const response = await petsHelpApi.post<AvatarResponse>(
      'specialist/avatar',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});
