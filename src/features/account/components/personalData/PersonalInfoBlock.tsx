import { districts } from '@/data/districts';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useRef, useState } from 'react';
// import { useFormContext } from 'react-hook-form';

// Sort districts alphabetically
const sortedDistricts = [...districts].sort((a, b) => a.localeCompare(b));

export default function PersonalInfoBlock() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));
  const [selectedDistrict, setSelectedDistrict] =
    useState<string>('Обрати район');

  // const {
  //   register,
  //   setValue,
  //   watch,
  //   formState: { errors },
  // } = useFormContext();

  // const selectedLocationOption = watch('locationOption');
  // const selectedDistrict = watch('district');

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    setDropdownOpen(false);
  };

  return (
    <div className="col-span-1 xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-x-23 gap-y-5">
      {/* Ім’я */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <div className="relative flex items-center">
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            aria-required="true"
            className="w-full input-base h-12 pl-11"
            placeholder="Ім'я"
          />
          <svg
            className="absolute w-6 h-6 fill-mist-gray right-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil-3" />
          </svg>
          <svg
            className="absolute w-3 h-3 fill-fire -right-4"
            aria-label="Обов'язкове поле"
          >
            <use href="/icons.svg#icon-required" />
          </svg>
        </div>
      </div>

      {/* Район */}
      <div>
        <label
          htmlFor="district"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <div className="xl:flex xl:relative">
          {/* Custom dropdown  */}
          <div className="relative xl:w-[472px]" ref={dropdownRef}>
            <h2 className="sr-only">Обрати район</h2>
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
              aria-controls="districts-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="input-base h-12 p-6 xl:pl-12 xl:pr-8 flex items-center justify-between"
            >
              {selectedDistrict || 'Обрати район'}
              <svg
                className={`w-[9px] h-[17px] fill-fire transform transition-transform duration-300 ease-in-out ${
                  dropdownOpen ? 'rotate-90' : 'rotate-270'
                } `}
              >
                <use href="/icons.svg#icon-arrow-left" />
              </svg>
            </button>

            {dropdownOpen && (
              <ul
                id="districts-dropdown"
                className="xl:absolute z-10 mt-4 xl:mt-2 max-h-[138px] overflow-y-hidden flex flex-col justify-between bg-alabaster border-2 border-tenn rounded-2xl shadow-[0_2px_3px_0_rgba(0,0,0,0.25)] w-full py-5"
                // aria-hidden={selectedLocationOption !== 'customer'}
              >
                {sortedDistricts.map((district, index) => (
                  <li
                    key={index}
                    tabIndex={0}
                    role="option"
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleDistrictClick(district);
                        e.preventDefault();
                      }
                    }}
                    onClick={() => handleDistrictClick(district)}
                    className="w-full cursor-pointer hover:bg-tenn focus:bg-tenn hover:text-alabaster focus:text-alabaster focus:outline-none transition-all duration-300 ease-in-out text-sm xl:text-base py-[5px] px-6 xl:px-12"
                    // aria-selected={selectedDistrict === district}
                    // {...register('district')}
                  >
                    {district}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Прізвище */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <div className="relative flex items-center">
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className="w-full input-base h-12 pl-11"
            placeholder="Прізвище"
          />
          <svg
            className="absolute w-6 h-6 fill-mist-gray right-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil-3" />
          </svg>
        </div>
      </div>

      {/* Досвід */}
      <div className="flex gap-6.5 justify-between">
        <span className="input-base flex items-center justify-center h-12 w-full text-fire">
          Досвід (років)
        </span>
        <label
          htmlFor="years"
          className="sr-only text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <input
          id="years"
          type="number"
          autoComplete="off"
          min="0"
          max="99"
          className="input-base h-12 items-center w-full"
        />
      </div>

      {/* Телефон */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <div className="relative flex items-center">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-required="true"
            className="w-full input-base h-12 pl-11"
            placeholder="+38 (0__) ___ __ __"
          />
          <svg
            className="absolute w-6 h-6 fill-mist-gray right-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil-3" />
          </svg>
          <svg
            className="absolute w-3 h-3 fill-fire -right-4"
            aria-label="Обов'язкове поле"
          >
            <use href="/icons.svg#icon-required" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        aria-label="Зберегти зміни"
        className="btn btn-primary min-w-[304px] object-fill w-fit mt-auto text-alabaster bg-tenn hover:bg-hover transition duration-300 ease-in-out p-3 rounded-2xl h-12"
      >
        Зберегти зміни
      </button>
    </div>
  );
}
