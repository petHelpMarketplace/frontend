// shared/constants/animals.ts
export const animals = [
  {
    id: 1,
    label: 'собаки',
  },
  {
    id: 2,
    label: 'коти',
  },
] as const;
export type AnimalCategoryId = (typeof animals)[number]['id'];
