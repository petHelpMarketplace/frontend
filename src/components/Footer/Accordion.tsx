import { useState } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Accordion = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full py-3 flex justify-between items-center text-left fill-alabaster pb-5"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="font-semibold">{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="alabaster"
        >
           <use href="/icons.svg#icon-arrow-bottom" />
        </svg>
      </button>

      <div
        className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] py-2' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
