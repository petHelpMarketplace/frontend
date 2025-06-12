const weights = [
  { label: 'Маленький', range: '0 - 7 кг' },
  { label: 'Середній', range: '7 - 18 кг' },
  { label: 'Великий', range: '18 - 45 кг' },
  { label: 'Гігантський', range: '45+ кг' },
];

const WeightSelector = () => {
  return (
    <div className="grid grid-cols-2 gap-x-[37px] gap-y-5 mb-[53px] xl:flex xl:gap-[29px] xl:justify-between">
      {weights.map(w => (
        <button
          key={w.label}
          className="xl:flex xl:flex-col text-[15px] h-[37px] xl:h-[68px] xl:text-base leading-[120%] xl:leading-[130%] xl:gap-[2px] xl:px-5 py-[9px] border-tenn border-[2px] w-[136px] rounded-[15px] xl:rounded-2xl shadow-filter xl:shadow-none  hover:bg-tenn hover:text-alabaster hover:shadow-shark active:shadow-inset-shark"
        >
          <span className="hidden xl:block">{w.label}</span>
          <span className="text-sm">({w.range})</span>
        </button>
      ))}
    </div>
  );
};

export default WeightSelector;
