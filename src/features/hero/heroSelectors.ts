// src/features/hero/heroSelectors.ts
import { RootState } from '@/store/store';

export const selectAnimal = (state: RootState) => state.hero.animal;
