import { dogsWeight } from '@/shared/constants/dogsWeight';
const WeightSelector = () => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-x-[37px] gap-y-5 xl:mb-0 xl:flex xl:justify-between xl:gap-[29px]">
      {dogsWeight.map(w => {
        const id = `hero-filter-weight-${w.label.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <button
            type="button"
            key={w.label}
            id={id}
            aria-pressed="false"
            className="group border-tenn hover:bg-tenn hover:text-alabaster hover:shadow-shark focus:shadow-shark focus-visible:shadow-shark active:shadow-inset-shark h-[37px] w-[136px] rounded-[15px] border-[2px] py-[9px] text-[15px] leading-[120%] focus:outline-none xl:flex xl:h-[68px] xl:flex-col xl:gap-[2px] xl:rounded-2xl xl:px-5 xl:text-base xl:leading-[130%]"
          >
            <span className="text-tenn group-hover:text-alabaster hidden xl:block">
              {w.label}
            </span>
            <span className="text-sm">({w.range})</span>
          </button>
        );
      })}
    </div>
  );
};

export default WeightSelector;
