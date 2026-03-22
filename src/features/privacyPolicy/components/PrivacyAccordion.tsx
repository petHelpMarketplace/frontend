import * as Accordion from '@radix-ui/react-accordion';
import { useEffect, useRef, useState } from 'react';
import { privacyPolicyData } from '../data';
import parseTextWithLinks from '../../../shared/utils/parseTextWithLinks';

const PrivacyAccordion = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleValueChange = (val: string | undefined) => {
    setValue(val);

    if (val) {
      window.history.replaceState(null, '', `#${val}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Scroll effect
  useEffect(() => {
    if (!value) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(value);
      if (el) {
        // Check whether the element is already positioned near the top of the viewport
        const rect = el.getBoundingClientRect();
        const isAlreadyVisible = rect.top >= 0 && rect.top <= 100;

        if (!isAlreadyVisible) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  // Init from hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const exists = privacyPolicyData.some(item => item.id === hash);
    if (exists) {
      setValue(hash);
    }
  }, []);

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={value}
      onValueChange={handleValueChange}
      className="flex flex-col gap-5"
    >
      {privacyPolicyData.map((data, idx) => {
        const { id, title, description, orderedLists } = data;

        const isOpen = value === id;

        const currentHeight = isOpen
          ? contentRefs.current[idx]?.scrollHeight || 0
          : 0;

        return (
          <Accordion.Item key={id} value={id} asChild>
            <div
              id={id}
              className="border-fire scroll-mt-24 rounded-2xl border-2 px-4 py-5 xl:px-11"
            >
              <Accordion.Header>
                <Accordion.Trigger className="text-fire border-fire flex w-full items-center justify-between gap-2 text-lg/[150%] xl:gap-7.5">
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
                </Accordion.Trigger>
              </Accordion.Header>

              <div
                ref={el => {
                  contentRefs.current[idx] = el;
                }}
                className="overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen ? `${currentHeight}px` : '0',
                  opacity: isOpen ? 1 : 0,
                  marginTop: isOpen ? '20px' : '0',
                }}
              >
                <Accordion.Content
                  forceMount
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

                  {orderedLists && orderedLists.length > 0 && (
                    <ol className="list-decimal space-y-1 pl-5 xl:pl-6">
                      {orderedLists.map((item, oIdx) => (
                        <li key={oIdx}>{parseTextWithLinks(item)}</li>
                      ))}
                    </ol>
                  )}
                </Accordion.Content>
              </div>
            </div>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
};

export default PrivacyAccordion;
