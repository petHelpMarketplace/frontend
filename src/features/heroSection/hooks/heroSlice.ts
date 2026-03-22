// src/features/hero/heroSlice.ts
import { AnimalCategoryId } from '@/shared/constants/animals';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeroState {
  animalCategoryId: AnimalCategoryId;
}

const initialState: HeroState = {
  animalCategoryId: 1,
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setAnimal(state, action: PayloadAction<AnimalCategoryId>) {
      state.animalCategoryId = action.payload;
    },
  },
});

export const { setAnimal } = heroSlice.actions;
export default heroSlice.reducer;
