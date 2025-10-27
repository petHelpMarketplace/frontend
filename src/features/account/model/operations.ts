import { createAsyncThunk } from '@reduxjs/toolkit';
import { AvatarRequest, AvatarResponse } from '../types/types';
import { petsHelpApi } from '@/shared/api/petsHelpApi';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { RootState } from '@/app/store';

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
