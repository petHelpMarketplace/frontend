import { useRef, useState } from 'react';
import { animals } from '@/data/bookMock';
import { dogsWeight } from '@/shared/constants/dogsWeight';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useFormContext } from 'react-hook-form';

const BookingCategory = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLocationOption = watch('locationOption');
  const selectedService = watch('service');
  const selectedAnimal = watch('animal');
  const selectedWeight = watch('weight');

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('locationOption', event.target.value);
  };

  const handleServiceClick = (service: string, animal: string) => {
    setValue('service', service);
    setValue('animal', animal);
    if (animal === 'собаки') {
      setValue('weight', selectedWeight || undefined);
    } else {
      setValue('weight', undefined);
    }

    setDropdownOpen(false);
  };

  return (
    <div>
      <h1 className="text-lg xl:text-xl font-semibold text-fire mb-4 xl:mb-5">
        Оберіть категорію послуг
      </h1>

      <div className="flex flex-col gap-6 xl:gap-0 xl:relative">
        {/* Dropdown */}
        <div className="relative w-full xl:w-[472px]" ref={dropdownRef}>
          <h2 className="sr-only">Обрати тварину/послугу</h2>
          <button
            type="button"
            tabIndex={0}
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
            className="input-base h-12 p-6 xl:pl-12 xl:pr-8 w-full text-left flex items-center justify-between"
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
              className="xl:absolute xl:z-10 mt-6 xl:mt-2 flex gap-8 justify-between bg-alabaster border-2 border-tenn rounded-2xl shadow-[0_2px_3px_0_rgba(0,0,0,0.25)] w-full px-10 xl:px-19 py-5.5 xl:py-7"
            >
              {animals.map(animal => (
                <div key={animal.name}>
                  <h3 className="text-fire text-center capitalize mb-1">
                    {animal.name}
                  </h3>
                  <ul className="leading-[187%]">
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
                        className="text-sm xl:text-base leading-[214%] cursor-pointer hover:text-fire hover:underline focus:text-fire focus:underline focus:outline-none transition-all duration-300 ease-in-out"
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
            <p className="absolute text-red-tenn text-[10px] pl-6.5 xl:pl-12 mt-1">
              {String(errors.service.message)}
            </p>
          )}
        </div>

        {/* Location radio buttons */}
        <fieldset className="flex justify-center xl:flex-col text-xs xl:text-sm gap-10 xl:gap-6 xl:absolute xl:left-[520px]">
          <legend className="sr-only">Місце виконання замовлення</legend>
          <label className="flex items-center gap-[10px] leading-none">
            <input
              type="radio"
              value="customer"
              {...register('locationOption')}
              checked={selectedLocationOption === 'customer'}
              onChange={handleLocationChange}
              className="book-radio-btn"
            />
            На виїзді
          </label>

          <label className="flex items-center gap-[10px] leading-none">
            <input
              type="radio"
              value="specialist"
              {...register('locationOption')}
              checked={selectedLocationOption === 'specialist'}
              onChange={handleLocationChange}
              className="book-radio-btn"
            />
            У фахівця
          </label>
        </fieldset>

        {/* Dog weight radio buttons */}
        {selectedAnimal === 'собаки' && (
          <div className="xl:absolute xl:left-[520px] xl:top-[130px]">
            <fieldset className="grid grid-cols-2 xl:grid-cols-1 gap-x-6 gap-y-3 xl:gap-y-6.5 text-sm px-4 py-3 xl:p-0 border-[2px] rounded-2xl border-tenn xl:border-none">
              <legend className="sr-only">Вага собаки</legend>
              {dogsWeight.map(weight => (
                <label
                  key={weight.range}
                  className="flex items-center gap-[10px]"
                  aria-selected={selectedWeight === weight.range}
                  aria-hidden={selectedAnimal !== 'собаки'}
                >
                  <input
                    type="radio"
                    value={weight.range}
                    {...register('weight')}
                    checked={selectedWeight === weight.range}
                    onChange={() => setValue('weight', weight.range)}
                    className="book-radio-btn"
                  />
                  {weight.label} {weight.range}
                </label>
              ))}
            </fieldset>
            {errors.weight?.message && (
              <div className="relative">
                <p className="absolute text-red-tenn text-[10px] pl-6.5 xl:pl-8 mt-1">
                  {String(errors.weight.message)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCategory;
