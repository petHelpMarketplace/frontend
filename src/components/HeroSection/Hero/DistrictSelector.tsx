import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const areas = [
  { label: 'Голосіївський', value: 'Голосіївський' },
  { label: 'Дарницький', value: 'Дарницький' },
  { label: 'Деснянський', value: 'Деснянський' },
  { label: 'Дніпровський', value: 'Дніпровський' },
  { label: 'Оболонський', value: 'Оболонський' },
  { label: 'Печерський', value: 'Печерський' },
  { label: 'Подільський', value: 'Подільський' },
  { label: 'Святошинський', value: 'Святошинський' },
  { label: "Солом'янський", value: "Солом'янський" },
  { label: 'Шевченківський', value: 'Шевченківський' },
];

export default function CustomSelect() {
  const [selected, setSelected] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel =
    areas.find(area => area.value === selected)?.label || 'Обрати район';

  return (
    <div
      className="relative w-full xl:w-1/2 border-[2px] border-tenn rounded-[15px] xl:rounded-2xl hover:shadow-shark"
      ref={dropdownRef}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between h-[47px] xl:h-[48px] py-[13px] pr-3.5 pl-[22px] text-[15px] xl:text-base xl:py-3 xl:pr-8 xl:pl-12 shadow-filter xl:shadow-none"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selectedLabel}
        <svg
          className={`w-4 h-4 transition-transform duration-200 text-tenn ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-100 left-0 mt-[9px] w-full flex flex-col gap-2 shadow-filter border-tenn border-[2px] py-[13px] xl:py-5 xl:pl-12 text-shark bg-alabaster rounded-[15px]"
          role="listbox"
          aria-label="Оберіть район"
        >
          {areas.map(area => (
            <li key={area.value}>
              <Link
                to={`/specialists?district=${encodeURIComponent(area.value)}`}
                className={`w-full h-[34px] pl-[22px] flex items-center  transition ${
                  selected === area.value
                    ? 'bg-tenn pl-0 text-white pointer-events-none'
                    : 'hover:bg-tenn hover:text-alabaster'
                } cursor-pointer`}
                onClick={() => {
                  setSelected(area.value);
                  setIsOpen(false);
                }}
                tabIndex={0}
                role="option"
                aria-selected={selected === area.value}
              >
                {area.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
