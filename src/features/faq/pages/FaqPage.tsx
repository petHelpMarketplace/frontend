import BackButton from '@/shared/components/UI/BackButton';
import FaqCategoryCard, { S } from '../components/FaqCategoryCard';
import { FAQ_ITEMS } from '../content/faqContentCard';
import { CATEGORY_SLUGS, type CategorySlug } from '../types';
import { TITLE as TITLES, ICON_BY_SLUG } from '../constants';
import { useMemo } from 'react';

export default function FaqPage() {
  const byCat = useMemo(
    () =>
      FAQ_ITEMS.reduce<
        Record<CategorySlug, { id: number; question: string }[]>
      >(
        (acc, { id, question, category }) => {
          (acc[category] ??= []).push({ id, question });
          return acc;
        },
        { registration: [], orders: [], general: [] }
      ),
    []
  );
  const getByCategory = (slug: CategorySlug) => byCat[slug];

  return (
    <div
      aria-labelledby="faq-title"
      className="w-full xl:px-[120px] xl:pt-17 xl:pb-18 mx-auto xl:max-w-[1280px]"
    >
      <div className="mx-auto px-0">
        <BackButton  className="mb-11.5" />
        <h1 id="faq-title" className="sr-only">
         Запитання та відповіді
        </h1>
        <div className="flex justify-center mx-auto xl:max-w-[1042px] xl:gap-x-7">
          {CATEGORY_SLUGS.map(cat => (
            <FaqCategoryCard
              key={cat}
              icon={
                <svg className={`${S.icon}`} aria-hidden focusable="false">
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#${ICON_BY_SLUG[cat]}`}
                  />
                </svg>
              }
              title={TITLES[cat]}
              slug={cat}
              questions={getByCategory(cat)}
              previewCount={8}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
