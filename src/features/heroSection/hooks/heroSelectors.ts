// src/features/hero/heroSelectors.ts
import { RootState } from '@/app/store';

export const selectAnimal = (state: RootState) => state.hero.animalCategoryId;
