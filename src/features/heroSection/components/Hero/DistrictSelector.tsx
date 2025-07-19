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
      buttonRef.current?.focus();
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
      className="relative w-full xl:w-1/2 rounded-[15px] xl:rounded-2xl"
      ref={dropdownRef}
    >
      {/* Toggle button */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="district-list"
        className="w-full flex items-center border-[2px] border-tenn justify-between h-[47px] xl:h-[48px] py-[13px] pr-3.5 pl-[22px] text-[15px] xl:text-base xl:py-3 xl:pr-8 xl:pl-12 hover:shadow-shark focus:shadow-shark focus:outline-none focus-visible:shadow-shark active:shadow-inset-shark rounded-[15px] xl:rounded-2xl"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selectedLabel}
        <svg
          className={clsx(
            'w-4 h-4 transition-transform duration-200 text-tenn',
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
          className="absolute z-50 left-0 mt-[9px] w-full flex flex-col gap-2 border-tenn border-[2px] py-[13px] xl:py-5 text-shark bg-alabaster rounded-[15px] hover:shadow-shark focus:shadow-shark focus:outline-none focus-visible:shadow-shark active:shadow-inset-shark"
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
                'w-full h-[34px] flex items-center transition cursor-pointer focus:outline-none pl-[22px] xl:pl-11',
                selected === area.value
                  ? 'bg-tenn text-white pointer-events-none'
                  : 'hover:bg-tenn hover:text-alabaster focus:bg-tenn  focus:text-alabaster'
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
