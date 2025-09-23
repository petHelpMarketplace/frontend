export const dogsWeight = [
  { label: 'Малі', range: '0-7 кг' },
  { label: 'Середні', range: '7-18 кг' },
  { label: 'Великі', range: '18-45 кг' },
  { label: 'Гігантські', range: '45+ кг' },
];

export const dogWeightRanges = dogsWeight.map(w => w.range) as [
  string,
  ...string[],
];
