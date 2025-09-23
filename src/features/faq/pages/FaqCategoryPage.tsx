// route /faq/:category
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // невалідна категорія → редірект на 404
  if (!isCat(raw)) {
    return (
      <Navigate to="/not-found" replace state={{ from: location.pathname }} />
    );
  }

  const questions = FAQ_ITEMS.filter(i => i.category === raw);

  // порожня категорія → редірект на 404 (якщо так вирішили)
  if (questions.length === 0) {
    return (
      <Navigate to="/not-found" replace state={{ from: location.pathname }} />
    );
  }

  return (
    <div className="mx-auto w-full xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
      <BackButton className="mb-11.5" />

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
    </div>
  );
}
