import { useState, useRef, useEffect, KeyboardEvent, useId } from 'react';

type Props = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

const Accordion = ({ title, isOpen, onToggle, children }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const panelId = useId(); // unique id for accessibility

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onToggle();
    } else if (e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div>
      <button
        type="button"
        id={`${panelId}-button`}
        className="w-full flex justify-between items-center text-left text-alabaster"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="font-semibold text-lg leading-[130%]">{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <use href="/icons.svg#icon-arrow-bottom" />
        </svg>
      </button>

      <div
        id={panelId}
        ref={contentRef}
        aria-labelledby={`${panelId}-button`}
        className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isOpen ? '' : 'max-h-0'
        }`}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
