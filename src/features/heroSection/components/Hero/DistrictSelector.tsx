import { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';

// TODO: Заміни константу AREAS на дані з бекенду, коли буде готовий API
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

type DistrictSelectorProps = {
  selected: string;
  setSelected: (val: string) => void;
};
export default function DistrictSelector({
  selected,
  setSelected,
}: DistrictSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Refs for accessibility and focus management
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Option select handler (mouse or keyboard)
  const handleSelect = useCallback(
    (value: string) => {
      setSelected(value);
      setIsOpen(false);
      // Return focus to the button for accessibility
      buttonRef.current?.focus();
    },
    [setSelected]
  );

  // Close dropdown if clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Handle Escape key to close dropdown and restore focus
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleClickOutside, handleEscapeKey]);

  // Focus management for first/selected option when opening dropdown
  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedIndex = areas.findIndex(area => area.value === selected);
      const targetIndex = selectedIndex !== -1 ? selectedIndex : 0;
      const options =
        listRef.current.querySelectorAll<HTMLElement>('[role="option"]');
      if (options[targetIndex]) {
        options[targetIndex].focus();
      }
    }
  }, [isOpen, selected]);

  // Keyboard navigation logic for the options list
  const handleListKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      const options = Array.from(
        listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') || []
      );
      const focusedIndex = options.findIndex(
        option => option === document.activeElement
      );
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (focusedIndex < options.length - 1) {
            options[focusedIndex + 1].focus();
          } else {
            options[0].focus();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (focusedIndex > 0) {
            options[focusedIndex - 1].focus();
          } else {
            options[options.length - 1].focus();
          }
          break;
        case 'Home':
          event.preventDefault();
          options[0]?.focus();
          break;
        case 'End':
          event.preventDefault();
          options[options.length - 1]?.focus();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (
            document.activeElement &&
            document.activeElement.getAttribute('role') === 'option'
          ) {
            const value = document.activeElement.getAttribute('data-value');
            if (value) handleSelect(value);
          }
          break;
        default:
          // Letter key search can be added if needed
          break;
      }
    },
    [handleSelect]
  );

  const selectedLabel =
    areas.find(area => area.value === selected)?.label ?? 'Обрати район';

  return (
    <div
      className="relative w-full rounded-[15px] xl:w-1/2 xl:rounded-2xl"
      ref={dropdownRef}
    >
      {/* Toggle button */}
      <button
        id="hero-filter-district"
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="district-list"
        className="border-tenn hover:shadow-shark focus:shadow-shark focus-visible:shadow-shark active:shadow-inset-shark flex h-[47px] w-full items-center justify-between rounded-[15px] border-[2px] py-[13px] pr-3.5 pl-[22px] text-[15px] focus:outline-none xl:h-[48px] xl:rounded-2xl xl:py-3 xl:pr-8 xl:pl-12 xl:text-base"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selectedLabel}
        <svg
          className={clsx(
            'text-tenn h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
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

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          id="district-list"
          ref={listRef}
          className="border-tenn text-shark bg-alabaster hover:shadow-shark focus:shadow-shark focus-visible:shadow-shark active:shadow-inset-shark absolute left-0 z-50 mt-[9px] flex w-full flex-col gap-2 rounded-[15px] border-[2px] py-[13px] focus:outline-none xl:py-5"
          role="listbox"
          aria-label="Оберіть район"
          tabIndex={0}
          onKeyDown={handleListKeyDown}
        >
          {areas.map(area => (
            <li
              key={area.value}
              id={`area-${area.value}`}
              role="option"
              aria-selected={selected === area.value}
              tabIndex={0}
              className={clsx(
                'flex h-[34px] w-full cursor-pointer items-center pl-[22px] transition focus:outline-none xl:pl-11',
                selected === area.value
                  ? 'bg-tenn pointer-events-none text-white'
                  : 'hover:bg-tenn hover:text-alabaster focus:bg-tenn focus:text-alabaster'
              )}
              onClick={() => handleSelect(area.value)}
              data-value={area.value}
            >
              <span className="">{area.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
