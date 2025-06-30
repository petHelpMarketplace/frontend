import { useAppSelector } from '@/shared/hooks/index';
import { selectAnimal } from '@/features/heroSection/hooks/heroSelectors';

const dogservices = [
  { label: 'Вигул', icon: 'icon-dog-on-the-leash' },
  { label: 'Перетримка', icon: 'icon-dog-house' },
  { label: 'Догляд вдома', icon: 'icon-sitting-dog' },
  { label: 'Грумінг', icon: 'icon-scissors' },
];
const catservices = [
  { label: 'Вакцинація', icon: 'icon-vet' },
  { label: 'Перетримка', icon: 'icon-cat-house-vec' },
  { label: 'Догляд вдома', icon: 'icon-cat' },
  { label: 'Грумінг', icon: 'icon-scissors' },
];

const ServiceTypeSelector = () => {
  const selected = useAppSelector(selectAnimal);
  const services = selected === 'dog' ? dogservices : catservices;
  const mbClass = selected === 'cat' ? 'mb-6 xl:mb-0' : 'mb-[33px] xl:mb-0';
  return (
    <div
      className={`grid grid-cols-2 gap-x-[10px] gap-y-3.5 ${mbClass} xl:grid-cols-4 xl:gap-7`}
    >
      {services.map(service => (
        <button
          key={service.label}
          className="flex flex-col items-center justify-center py-4.5 rounded-[14px] text-[15px] leading-[120%] xl:rounded-2xl border-tenn border-[2px] hover:bg-tenn hover:text-alabaster  hover:shadow-shark focus:shadow-shark focus:outline-none focus-visible:shadow-shark active:shadow-inset-shark group xl:gap-2 xl:py-3 xl:px-13 xl:flex-row"
        >
          <svg
            className="hidden xl:block h-[52px] w-[55px] shrink-0 fill-tenn group-hover:fill-alabaster"
            role="img"
            aria-label={service.label}
          >
            <title>{service.label}</title>
            <use href={`/icons.svg#${service.icon}`} />
          </svg>
          <span>{service.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ServiceTypeSelector;
