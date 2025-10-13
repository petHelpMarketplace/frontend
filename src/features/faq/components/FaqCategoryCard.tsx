import { memo, useMemo, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import type { CategorySlug, FaqItem } from '@/features/faq/types';

type Variant = 'card' | 'split';

export const S = {
  card: 'flex-none shrink-0 box-border w-[328px] min-h-[638px] rounded-2xl shadow-faq py-8 px-6.5',
  header: 'flex items-end gap-3.5 mb-10.5',
  icon: 'w-7 h-8 fill-fire',
  title:
    'font-semibold text-xl/[135%] text-fire translate-y-[1px] focus-visible:ring-fire rounded transition-colors duration-300 ease-in-out outline-none focus-visible:ring-2',
  list: 'gap-11.5 flex flex-col',
  item: 'leading-[135%] text-black hover:text-fire',
  empty: 'leading-[135%] text-black',
} as const;

export type FaqCategoryCardProps = {
  title: string;
  slug: CategorySlug;
  questions: Pick<FaqItem, 'id' | 'question'>[];
  previewCount?: number;
  icon?: ReactNode;
  emptyText?: string;
  className?: string;
  variant?: Variant;
  activeId?: number;
  headerClassName?: string;
  listClassName?: string;
  cardClassName?: string;
} & React.HTMLAttributes<HTMLElement>;

const FaqCategoryCard = memo(function FaqCategoryCard({
  title,
  slug,
  questions,
  previewCount = 8,
  icon,
  emptyText = 'Наразі в цій категорії немає запитань.',
  className,
  variant = 'card',
  headerClassName,
  listClassName,
  cardClassName,
  ...rest
}: FaqCategoryCardProps) {
  const items = useMemo(
    () => (questions ?? []).slice(0, Math.max(0, previewCount)),
    [questions, previewCount]
  );

  // ========= ВАРІАНТ "split": пігулка заголовка + окрема картка зі списком =========
  if (variant === 'split') {
    return (
      <article
        className={twMerge('w-[328px]', className)}
        aria-labelledby={`faq-${slug}-title`}
        {...rest}
      >
        {/* пігулка заголовка */}
        <div className="shadow-smoke mb-4.5 h-[68px] max-w-[328px] rounded-2xl px-10.5 py-4.5">
          <header className={twMerge(S.header, headerClassName)}>
            {icon && (
              <span aria-hidden className={S.icon}>
                {icon}
              </span>
            )}
            <h2 className={S.title} id={`faq-${slug}-title`}>
              {title}
            </h2>
          </header>
        </div>

        {/* картка зі списком */}
        <section
          className={twMerge(S.card, 'min-h-[540px] pt-9', cardClassName)}
          aria-labelledby={`faq-${slug}-title`}
        >
          {items.length ? (
            <ul className={twMerge(S.list, listClassName)}>
              {items.map(q => (
                <li key={q.id}>
                  <NavLink
                    to={`/faq/${slug}/${q.id}`}
                    className={({ isActive }) =>
                      twMerge(
                        S.item,
                        'focus-visible:ring-fire/40 rounded transition-colors duration-300 ease-in-out outline-none focus-visible:ring-2',
                        isActive &&
                          'text-fire transition-colors duration-300 ease-in-out'
                      )
                    }
                  >
                    {q.question}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className={S.empty}>{emptyText}</p>
          )}
        </section>
      </article>
    );
  }

  // ========= ВАРІАНТ "card": заголовок всередині картки (для /faq) =========
  return (
    <section
      className={twMerge(S.card, className)}
      aria-labelledby={`faq-${slug}-title`}
      {...rest}
    >
      <header className={twMerge(S.header, headerClassName)}>
        {icon && (
          <span aria-hidden className={S.icon}>
            {icon}
          </span>
        )}
        <h2 className={S.title} id={`faq-${slug}-title`}>
          {title}
        </h2>
      </header>

      {items.length ? (
        <ul className={twMerge(S.list, listClassName)}>
          {items.map(q => (
            <li key={q.id}>
              <Link
                to={`/faq/${slug}/${q.id}`}
                className={twMerge(
                  S.item,
                  'focus-visible:ring-fire/40 rounded transition-colors duration-300 ease-in-out outline-none focus-visible:ring-2'
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
