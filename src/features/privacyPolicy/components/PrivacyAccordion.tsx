import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { privacyPolicyData } from '../data';
import parseTextWithLinks from '../../../shared/utils/parseTextWithLinks';

const PrivacyAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Create an array of refs for each section to know where to scroll
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (idx: number) => {
    const newIndex = openIndex === idx ? null : idx;
    setOpenIndex(newIndex);

    if (newIndex !== null) {
      const id = privacyPolicyData[newIndex].id;
      window.history.replaceState(null, '', `#${id}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Effect for scrolling
  useEffect(() => {
    if (openIndex !== null) {
      const id = privacyPolicyData[openIndex]?.id;
      if (!id) return;

      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [openIndex]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');

    if (!hash) return;

    const index = privacyPolicyData.findIndex(item => item.id === hash);

    if (index !== -1) {
      setOpenIndex(index);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {privacyPolicyData.map((data, idx) => {
        const { id, title, description, orderedLists } = data;
        const isOpen = openIndex === idx;

        // Calculate the block height
        const currentHeight = isOpen
          ? contentRefs.current[idx]?.scrollHeight || 0
          : 0;

        return (
          <Disclosure key={idx} as="div">
            {/* Attach ref to the section container */}
            <div
              id={id}
              className="border-fire rounded-2xl border-2 px-4 py-5 xl:px-11"
            >
              <DisclosureButton
                className="text-fire border-fire flex w-full items-center justify-between gap-2 text-lg/[150%] xl:gap-7.5"
                onClick={() => handleToggle(idx)}
              >
                <div className="flex gap-2 xl:gap-7.5">
                  <svg className="fill-fire h-7 w-7">
                    <use href="/icons.svg#icon-rolled-document" />
                  </svg>
                  <h2 className="self-center text-start text-lg/[111%] xl:text-xl/[135%]">
                    {title}
                  </h2>
                </div>
                <svg
                  className={`fill-fire h-4 w-2 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'rotate-90' : 'rotate-270'
                  }`}
                >
                  <use href="/icons.svg#icon-arrow-left" />
                </svg>
              </DisclosureButton>

              {/* Animation implementation using classes */}
              <div
                ref={el => {
                  contentRefs.current[idx] = el;
                }}
                className="overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out"
                style={{
                  // If open — set scrollHeight, if closed — set to 0
                  maxHeight: isOpen ? `${currentHeight}px` : '0',
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? '20px' : '0',
                }}
              >
                <DisclosurePanel
                  static
                  className="text-justify text-sm/[136%] xl:text-base"
                >
                  {description?.map((desc, dIdx) => (
                    <div key={dIdx} className="mb-1">
                      <p className="mb-1">{parseTextWithLinks(desc.text)}</p>
                      {desc.unorderedLists && (
                        <ul className="mb-1 list-disc pl-5 xl:pl-6">
                          {desc.unorderedLists.map((item, k) => (
                            <li key={k}>{parseTextWithLinks(item)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <ol className="list-decimal space-y-1 pl-5 xl:pl-6">
                    {orderedLists?.map((item, oIdx) => (
                      <li key={oIdx}>{item}</li>
                    ))}
                  </ol>
                </DisclosurePanel>
              </div>
            </div>
          </Disclosure>
        );
      })}
    </div>
  );
};

export default PrivacyAccordion;
