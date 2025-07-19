// src/features/hero/heroSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeroState {
  animal: "dog" | "cat";
}

const initialState: HeroState = {
  animal: "dog",
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setAnimal(state, action: PayloadAction<"dog" | "cat">) {
      state.animal = action.payload;
    },
  },
});

export const { setAnimal } = heroSlice.actions;
export default heroSlice.reducer;
