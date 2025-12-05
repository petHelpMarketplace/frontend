import { useAppSelector } from '@/shared/hooks/index';
import { selectAnimal } from '@/features/heroSection/hooks/heroSelectors';

const dogservices = [
  { id: 'walking', label: 'Вигул', icon: 'icon-dog-on-the-leash' },
  { id: 'boarding', label: 'Перетримка', icon: 'icon-dog-house' },
  { id: 'home-care', label: 'Догляд вдома', icon: 'icon-sitting-dog' },
  { id: 'grooming', label: 'Грумінг', icon: 'icon-scissors' },
] as const;

const catservices = [
  { id: 'vaccination', label: 'Вакцинація', icon: 'icon-vet' },
  { id: 'boarding', label: 'Перетримка', icon: 'icon-cat-house-vec' },
  { id: 'home-care', label: 'Догляд вдома', icon: 'icon-cat' },
  { id: 'grooming', label: 'Грумінг', icon: 'icon-scissors' },
] as const;

const ServiceTypeSelector = () => {
  const selected = useAppSelector(selectAnimal);
  const services = selected === 'dog' ? dogservices : catservices;
  const mbClass = selected === 'cat' ? 'mb-6 xl:mb-0' : 'mb-[33px] xl:mb-0';
  return (
    <div
      className={`grid grid-cols-2 gap-x-[10px] gap-y-3.5 ${mbClass} xl:grid-cols-4 xl:gap-7`}
    >
      {services.map(service => {
        return (
          <button
            type="button"
            key={service.id}
            id={`hero-filter-service-${service.id}`}
            className="border-tenn hover:bg-tenn hover:text-alabaster hover:shadow-shark focus:shadow-shark focus-visible:shadow-shark active:shadow-inset-shark group flex flex-col items-center justify-center rounded-[14px] border-[2px] py-4.5 text-[15px] leading-[120%] focus:outline-none xl:gap-2 xl:rounded-2xl xl:px-13 xl:py-4"
          >
            <svg
              aria-hidden="true"
              className="fill-tenn group-hover:fill-alabaster hidden h-[52px] w-[55px] shrink-0 xl:block"
            >
              <use href={`/icons.svg#${service.icon}`} />
            </svg>
            <span>{service.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ServiceTypeSelector;
