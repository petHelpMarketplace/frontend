import { useAppSelector } from '@/shared/hooks/index';
import { selectAnimal } from '@/features/hero/heroSelectors';

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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
      {services.map(service => (
        <button
          key={service.label}
          className="flex flex-col items-center justify-center gap-2 py-3 px-13 border rounded-[16px] border-tenn border-[2px] hover:bg-tenn hover:text-alabaster hover:border-none hover:shadow-shark active:shadow-inset-shark group"
        >
          <svg
            className="h-[52px] w-[55px] shrink-0 fill-tenn group-hover:fill-alabaster"
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
