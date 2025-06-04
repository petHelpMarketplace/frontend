const weights = [
  { label: 'Маленький', range: '0 - 7 кг' },
  { label: 'Середній', range: '7 - 18 кг' },
  { label: 'Великий', range: '18 - 45 кг' },
  { label: 'Гігантський', range: '45+ кг' },
];

const WeightSelector = () => {
  return (
    <div className="flex gap-[29px] justify-between">
      {weights.map(w => (
        <button
          key={w.label}
          className="flex flex-col gap-[2px] px-[20px] py-[9px] border-tenn border-[2px] w-[136px] rounded-[16px] font-medium hover:bg-tenn hover:text-alabaster hover:shadow-shark active:shadow-inset-shark"
        >
          <span>{w.label}</span>
          <span className="text-sm">({w.range})</span>
        </button>
      ))}
    </div>
  );
};

export default WeightSelector;
