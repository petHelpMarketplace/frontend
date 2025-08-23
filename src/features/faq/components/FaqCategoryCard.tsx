import { memo, useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import type { CategorySlug, FaqItem } from "@/features/faq/types";

type Variant = "card" | "split";

export const S = {
  card:
    "flex-none shrink-0 box-border w-[328px] min-h-[638px] rounded-2xl shadow-faq py-8 px-6.5",
  header: "flex items-end gap-3.5 mb-10.5",
  icon: "w-7 h-8 fill-fire",
  title: "font-semibold text-xl/[135%] text-fire translate-y-[1px]",
  list: "gap-11.5 flex flex-col",
  item: "leading-[135%] text-black hover:text-fire",
  empty: "leading-[135%] text-black",
} as const;

export type FaqCategoryCardProps = {
  title: string;
  slug: CategorySlug;
  questions: Pick<FaqItem, "id" | "question">[];
  previewCount?: number;
  icon?: ReactNode;
  emptyText?: string;
  className?: string;

  // варіанти відображення
  variant?: Variant;         // "card" (за замовч.) або "split"
  activeId?: number;         // підсвітка активного питання у списку
  headerClassName?: string;  // тонке налаштування хедера
  listClassName?: string;    // тонке налаштування списку
} & React.ComponentPropsWithoutRef<"section">;

const FaqCategoryCard = memo(function FaqCategoryCard({
  title,
  slug,
  questions,
  previewCount = 8,
  icon,
  emptyText = "No questions are available in this category at the moment.",
  className,
  variant = "card",
  activeId,
  headerClassName,
  listClassName,
  ...rest
}: FaqCategoryCardProps) {
  const items = useMemo(
    () => (questions ?? []).slice(0, Math.max(0, previewCount)),
    [questions, previewCount]
  );

  // ========= ВАРІАНТ "split": пігулка заголовка + окрема картка зі списком =========
  if (variant === "split") {
    return (
      <aside className={twMerge("w-[328px]", className)} {...rest}>
        {/* пігулка заголовка */}
        <div className="max-w-[328px] h-[68px] rounded-2xl shadow-smoke px-10.5 py-4.5 mb-4.5">
          <header className={twMerge(S.header, headerClassName)}>
            {icon && <span aria-hidden className={S.icon}>{icon}</span>}
            <h3 className={S.title}>
              <Link
                to={`/faq/${slug}`}
                className="outline-none focus-visible:ring-2 focus-visible:ring-fire rounded"
              >
                {title}
              </Link>
            </h3>
          </header>
        </div>

        {/* картка зі списком */}
        <section className={twMerge(S.card, "pt-9 min-h-[540px]")}>
          {items.length ? (
            <ul className={twMerge(S.list, listClassName)}>
              {items.map((q) => (
                <li key={q.id}>
                  <Link
                    to={`/faq/${slug}/${q.id}`}
                    aria-current={q.id === activeId ? "page" : undefined}
                    className={twMerge(
                      S.item,
                      "outline-none focus-visible:ring-2 focus-visible:ring-fire/40 rounded",
                      q.id === activeId && "text-fire"
                    )}
                  >
                    {q.question}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={S.empty}>{emptyText}</p>
          )}
        </section>
      </aside>
    );
  }

  // ========= ВАРІАНТ "card": заголовок всередині картки (для /faq) =========
  return (
    <section className={twMerge(S.card, className)} aria-label={`${title} category`} {...rest}>
      <header className={twMerge(S.header, headerClassName)}>
        {icon && <span aria-hidden className={S.icon}>{icon}</span>}
        <h3 className={S.title}>
          <Link
            to={`/faq/${slug}`}
            className="outline-none focus-visible:ring-2 focus-visible:ring-fire rounded"
          >
            {title}
          </Link>
        </h3>
      </header>

      {items.length ? (
        <ul className={twMerge(S.list, listClassName)}>
          {items.map((q) => (
            <li key={q.id}>
              <Link
                to={`/faq/${slug}/${q.id}`}
                className={twMerge(
                  S.item,
                  "outline-none focus-visible:ring-2 focus-visible:ring-fire/40 rounded"
                )}
              >
                {q.question}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={S.empty}>{emptyText}</p>
      )}
    </section>
  );
});

export default FaqCategoryCard;
