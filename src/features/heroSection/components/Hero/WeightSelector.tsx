import { dogsWeight } from '@/shared/constants/dogsWeight';
const WeightSelector = () => {
  return (
    <div className="grid grid-cols-2 gap-x-[37px] gap-y-5 mb-[53px] xl:mb-0 xl:flex xl:gap-[29px] xl:justify-between">
      {dogsWeight.map(w => (
        <button
          type="button"
          key={w.label}
          aria-pressed="false"
          className="group xl:flex xl:flex-col text-[15px] h-[37px] xl:h-[68px] xl:text-base leading-[120%] xl:leading-[130%] xl:gap-[2px] xl:px-5 py-[9px] border-tenn border-[2px] w-[136px] rounded-[15px] xl:rounded-2xl hover:bg-tenn hover:text-alabaster hover:shadow-shark focus:shadow-shark focus:outline-none focus-visible:shadow-shark active:shadow-inset-shark"
        >
          <span className="hidden xl:block text-tenn group-hover:text-alabaster">
            {w.label}
          </span>
          <span className="text-sm">({w.range})</span>
        </button>
      ))}
    </div>
  );
};

export default WeightSelector;
