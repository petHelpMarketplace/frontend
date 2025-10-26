import { districts } from '@/data/districts';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useRef, useState } from 'react';
// import { useFormContext } from 'react-hook-form';
import Button from '@/shared/components/UI/Button';

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
    <div className="col-span-1 grid grid-cols-1 gap-x-23 gap-y-5 xl:col-span-2 xl:grid-cols-2">
      {/* Ім’я */}
      <div>
        <label
          htmlFor="firstName"
          className="text-tenn mb-1 block pl-4 text-sm font-semibold"
        ></label>
        <div className="relative flex items-center">
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            aria-required="true"
            className="input-base h-12 w-full pl-11"
            placeholder="Ім'я"
          />
          <svg
            className="fill-mist-gray absolute right-8 h-6 w-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil-3" />
          </svg>
          <svg
            className="fill-fire absolute -right-4 h-3 w-3"
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
          className="text-tenn mb-1 block pl-4 text-sm font-semibold"
        ></label>
        <div className="xl:relative xl:flex">
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
              className="input-base flex h-12 items-center justify-between p-6 xl:pr-8 xl:pl-12"
            >
              {selectedDistrict || 'Обрати район'}
              <svg
                className={`fill-fire h-[17px] w-[9px] transform transition-transform duration-300 ease-in-out ${
                  dropdownOpen ? 'rotate-90' : 'rotate-270'
                } `}
              >
                <use href="/icons.svg#icon-arrow-left" />
              </svg>
            </button>

            {dropdownOpen && (
              <ul
                id="districts-dropdown"
                className="bg-alabaster border-tenn z-10 mt-4 flex max-h-[138px] w-full flex-col justify-between overflow-y-auto rounded-2xl border-2 py-5 shadow-[0_2px_3px_0_rgba(0,0,0,0.25)] xl:absolute xl:mt-2"
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
                    className="hover:bg-tenn focus:bg-tenn hover:text-alabaster focus:text-alabaster w-full cursor-pointer px-6 py-[5px] text-sm transition-all duration-300 ease-in-out focus:outline-none xl:px-12 xl:text-base"
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
          className="text-tenn mb-1 block pl-4 text-sm font-semibold"
        ></label>
        <div className="relative flex items-center">
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className="input-base h-12 w-full pl-11"
            placeholder="Прізвище"
          />
          <svg
            className="fill-mist-gray absolute right-8 h-6 w-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil-3" />
          </svg>
        </div>
      </div>

      {/* Досвід */}
      <div className="flex justify-between gap-6.5">
        <span className="input-base text-fire flex h-12 w-full items-center justify-center">
          Досвід (років)
        </span>
        <label
          htmlFor="years"
          className="text-tenn sr-only mb-1 pl-4 text-sm font-semibold"
        ></label>
        <input
          id="years"
          type="number"
          autoComplete="off"
          min="0"
          max="70"
          className="input-base h-12 w-full items-center"
        />
      </div>

      {/* Телефон */}
      <div>
        <label
          htmlFor="phone"
          className="text-tenn mb-1 block pl-4 text-sm font-semibold"
        ></label>
        <div className="relative flex items-center">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-required="true"
            className="input-base h-12 w-full pl-11"
            placeholder="+38 (XXX) XXX XX XX"
          />
          <svg
            className="fill-mist-gray absolute right-8 h-6 w-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil-3" />
          </svg>
          <svg
            className="fill-fire absolute -right-4 h-3 w-3"
            aria-label="Обов'язкове поле"
          >
            <use href="/icons.svg#icon-required" />
          </svg>
        </div>
      </div>

      <Button
        type="submit"
        label="Зберегти зміни"
        className="btn-lg h-12 w-fit"
      />
    </div>
  );
}
