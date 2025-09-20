// route /faq/:category
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import { FAQ_ITEMS } from '@/features/faq/content/faqContentCard';
import { S } from '@/features/faq/components/FaqCategoryCard';
import {
  TITLE as TITLES,
  ICON_BY_SLUG,
  isCategorySlug as isCat,
} from '../constants';
import BackButton from '@/shared/components/UI/BackButton';

export default function FaqCategoryPage() {
  const { category: raw } = useParams<{ category: string }>();
  if (!isCat(raw)) return <NotFoundPage />; // невалідна категорія → 404

  // після цієї перевірки TS звужує тип, тож raw — це CategorySlug
  const questions = FAQ_ITEMS.filter(i => i.category === raw);
  const isEmpty = questions.length === 0;

  return (
    <div className="mx-auto w-full xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
      <BackButton to="/faq" className="mb-11.5" />

      {isEmpty ? (
        <NotFoundPage
          showBackButton={false}
          message="Схоже, в цій категорії поки немає питань"
          primaryTo="/faq"
          primaryText="До FAQ"
        />
      ) : (
        <section
          aria-labelledby="cat-title"
          className={`${S.card} h-auto w-full max-w-[328px]`}
        >
          <h1
            id="cat-title"
            className="text-fire mb-10 flex items-end gap-3.5 text-xl/[135%] font-semibold"
          >
            <svg className={S.icon} aria-hidden focusable="false">
              <use
                href={`${import.meta.env.BASE_URL}icons.svg#${ICON_BY_SLUG[raw]}`}
              />
            </svg>
            {TITLES[raw]}
          </h1>

          <ul className="flex flex-col gap-11.5" role="list">
            {questions.map(q => (
              <li key={q.id}>
                <Link
                  to={`/faq/${raw}/${q.id}`}
                  className={`${S.item} rounded transition-colors duration-300 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-[#aa4700]/40`}
                >
                  {q.question}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
