import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { useState } from 'react';
import { privacyPolicyData } from '../data';

const PrivacyAccordion = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {privacyPolicyData.map((data, idx) => {
        const { title, description, orderedLists } = data;

        return (
          <Disclosure>
            {({ open }) => (
              <div
                key={idx}
                className="border-fire rounded-2xl border-2 px-4 py-5 xl:px-11"
              >
                <DisclosureButton
                  className="text-fire border-fire flex w-full items-center justify-between gap-2 text-lg/[150%] xl:gap-7.5"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
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
                      open ? 'rotate-90' : 'rotate-270'
                    }`}
                  >
                    <use href="/icons.svg#icon-arrow-left" />
                  </svg>
                </DisclosureButton>

                <DisclosurePanel className="mt-4.5 text-justify text-sm/[136%] xl:mt-5 xl:text-base">
                  {description?.map((desc, idx) => (
                    <div key={idx} className="mb-1">
                      <p className="mb-1">{desc.text}</p>

                      <ul className="mb-1 list-disc pl-5 xl:pl-6">
                        {desc.unorderedLists?.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <ol className="list-decimal space-y-1 pl-5 xl:pl-6">
                    {orderedLists?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default PrivacyAccordion;
