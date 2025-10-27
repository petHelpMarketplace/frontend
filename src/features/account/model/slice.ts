import { createSlice } from '@reduxjs/toolkit';
import { SpecInfoState } from '../types/types';
import { postSpecAvatar } from './operations';

const initialState: SpecInfoState = {
  specInfo: {
    id: null,
    name: null,
    family_name: null,
    email: null,
    avatar_url: null,
    bio: null,
    description: null,
    experience: null,
    is_active: false,
    is_verified: false,
    phone: null,
    portfolio_urls: null,
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
    builder.addCase(postSpecAvatar.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postSpecAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.specInfo.avatar_url = action.payload.url;
    });
    builder.addCase(postSpecAvatar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to upload avatar';
    });
  },
});

export const specInfoReducer = specInfoSlice.reducer;
