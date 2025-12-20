import { createSlice } from '@reduxjs/toolkit';
import { SpecInfoState } from '../types/types';
import { getSpecInfo, patchSpecProfile, postSpecAvatar } from './operations';
import { logoutSpec } from '@/features/auth/model/operations';

const initialState: SpecInfoState = {
  specInfo: {
    name: '',
    family_name: null,
    email: '',
    avatar_url: null,
    bio: null,
    description: null,
    experience: null,
    is_active: false,
    is_verified: false,
    phone: null,
    portfolio_urls: [],
    position: null,
  },
  loading: false,
  error: null,
};

const specInfoSlice = createSlice({
  name: 'specInfo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSpecInfo.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSpecInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.specInfo = action.payload;
    });
    builder.addCase(getSpecInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to get specialist personal info';
    });
    builder.addCase(patchSpecProfile.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(patchSpecProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.specInfo = { ...state.specInfo, ...action.payload };
    });
    builder.addCase(patchSpecProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to update profile';
    });
    builder.addCase(postSpecAvatar.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postSpecAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.specInfo.avatar_url = action.payload.url;
    });
    builder
      .addCase(postSpecAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to upload avatar';
      })
      .addCase(logoutSpec.fulfilled, () => initialState);
  },
});

export const specInfoReducer = specInfoSlice.reducer;
