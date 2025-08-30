// route /faq/:category
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import { FAQ_ITEMS } from "@/features/faq/content/faqContentCard";
import { S } from "@/features/faq/components/FaqCategoryCard";
import type { CategorySlug } from "@/features/faq/types";
import BackButton from "@/shared/components/UI/BackButton";

const TITLE: Record<CategorySlug, string> = {
  registration: "Реєстрація фахівців",
  orders: "Замовлення",
  general: "Загальні питання",
};
const ICON_BY_SLUG: Record<CategorySlug, string> = {
  registration: "icon-registration",
  orders: "icon-order",
  general: "icon-questions",
};
const isCat = (v: string | undefined): v is CategorySlug =>
  v === "registration" || v === "orders" || v === "general";

export default function FaqCategoryPage() {
  const { category: raw } = useParams<{ category: string }>();
  if (!isCat(raw)) return <NotFoundPage />; 
  

  const questions = FAQ_ITEMS.filter((i) => i.category === raw);

  return (
    <div className="w-full mx-auto xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
      <BackButton to="/faq" className="mb-11.5" />
 
      <section
        aria-labelledby="cat-title"
        className={`${S.card} w-full h-auto max-w-[328px]`}
      >
      <h1
  id="cat-title"
  className="flex items-end gap-3.5 text-xl/[135%] font-semibold text-fire mb-10"
>
  <svg className={S.icon} aria-hidden focusable="false">
    <use href={`${import.meta.env.BASE_URL}icons.svg#${ICON_BY_SLUG[raw]}`} />
    {/* опціонально для старих Safari:
    <use xlinkHref={`${import.meta.env.BASE_URL}icons.svg#${ICON_BY_SLUG[raw]}`} /> */}
  </svg>
  {TITLE[raw]}
</h1>
        {questions.length > 0 ? (
          <ul className="flex flex-col gap-11.5" role="list">
            {questions.map((q) => (
              <li key={q.id}>
                <Link
                  to={`/faq/${raw}/${q.id}`}
                  className={`${S.item} outline-none focus-visible:ring-2 focus-visible:ring-[#aa4700]/40 rounded`}
                >
                  {q.question}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={S.empty}>
            No questions are available in this category at the moment.
          </p>
        )}
      </section>
    </div>
  );
}
