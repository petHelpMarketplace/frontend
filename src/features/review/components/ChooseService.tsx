import { useFormContext } from 'react-hook-form';
import { animals } from '@/data/bookMock';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useRef, useState } from 'react';
import { ReviewSchemaType } from '@/features/review/validation/reviewSchema';

const ChooseService = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ReviewSchemaType>();

  const selectedService = watch('service');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleServiceClick = (service: string, animal: string) => {
    setValue('service', service);
    setValue('animal', animal as ReviewSchemaType['animal']);

    setDropdownOpen(false);
  };

  return (
    <div>
      <div className="relative xl:w-[472px]" ref={dropdownRef}>
        <h2 className="sr-only">Обрати тварину/послугу</h2>
        <button
          type="button"
          tabIndex={0}
          aria-haspopup="listbox"
          aria-label="Обрати послугу для тварини"
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setDropdownOpen(true);
            } else if (e.key === 'Escape') {
              setDropdownOpen(false);
            }
          }}
          aria-expanded={dropdownOpen}
          aria-controls="services-dropdown"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="input-base h-12 py-[11px] pl-11 pr-8 w-full text-left flex items-center justify-between"
        >
          {selectedService || 'Обрати послугу'}
          <svg
            className={`w-[9px] h-[17px] fill-fire transform transition-transform duration-300 ease-in-out ${
              dropdownOpen ? 'rotate-90' : 'rotate-270'
            } `}
          >
            <use href="/icons.svg#icon-arrow-left" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            id="services-dropdown"
            role="listbox"
            aria-label="Список послуг"
            className="absolute z-10 mt-2 flex gap-8 justify-between bg-alabaster border-2 border-tenn rounded-2xl shadow-[0_2px_3px_0_rgba(0,0,0,0.25)] w-full px-19 py-7"
          >
            {animals.map(animal => (
              <div key={animal.name}>
                <h3 className="mb-1 text-fire text-center capitalize">
                  {animal.name}
                </h3>
                <ul className="space-y-1">
                  {animal.services.map(service => (
                    <li
                      key={service}
                      tabIndex={0}
                      role="option"
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleServiceClick(service, animal.name);
                          e.preventDefault();
                        }
                      }}
                      onClick={() => handleServiceClick(service, animal.name)}
                      className="cursor-pointer hover:text-fire hover:underline focus:text-fire focus:underline focus:outline-none transition-all duration-300 ease-in-out"
                      aria-selected={selectedService === service}
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {errors.service?.message && (
          <p className="absolute text-red-tenn text-[10px] pl-12 mt-1">
            {String(errors.service.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChooseService;
