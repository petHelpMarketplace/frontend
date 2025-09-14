import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccountState = {
  email: string;
  isActive: boolean;
};

const initialState: AccountState = {
  email: '',
  isActive: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    toggleActiveStatus: state => {
      state.isActive = !state.isActive;
    },
  },
});

export const { setEmail, toggleActiveStatus } = accountSlice.actions;
export default accountSlice.reducer;
