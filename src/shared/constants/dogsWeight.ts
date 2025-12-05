export const dogsWeight = [
  { id: 'small', label: 'Малі', range: '0-7 кг' },
  { id: 'medium', label: 'Середні', range: '7-18 кг' },
  { id: 'large', label: 'Великі', range: '18-45 кг' },
  { id: 'giant', label: 'Гігантські', range: '45+ кг' },
];

export const dogWeightRanges = dogsWeight.map(w => w.range) as [
  string,
  ...string[],
];
