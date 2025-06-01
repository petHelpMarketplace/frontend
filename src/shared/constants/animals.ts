// shared/constants/animals.ts
export const animals = ['собаки', 'коти'] as const;
export type Animal = (typeof animals)[number];
