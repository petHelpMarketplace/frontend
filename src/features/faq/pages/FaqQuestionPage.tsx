// src/features/faq/pages/FaqQuestionPage.tsx
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useMemo } from 'react';
import type { CategorySlug } from '@/features/faq/types';
import { FAQ_ITEMS } from '@/features/faq/content/faqContentCard';
import BackButton from '@/shared/components/UI/BackButton';
import FaqCategoryCard, { S } from '@/features/faq/components/FaqCategoryCard';
import {
  TITLE,
  ICON_BY_SLUG,
  isCategorySlug as isCat,
} from '@/features/faq/constants';
import { sanitizeHtml } from '@/features/faq/purify';

export default function FaqQuestionPage() {
  const { category: rawCat, id: rawId } = useParams<{
    category: string;
    id: string;
  }>();
  const location = useLocation();

  const answerRef = useRef<HTMLDivElement>(null);

  const cat: CategorySlug | null = isCat(rawCat) ? rawCat : null;
  const id = rawId && /^\d+$/.test(rawId) ? Number(rawId) : NaN;

  const list = cat ? FAQ_ITEMS.filter(i => i.category === cat) : [];
  const item = Number.isFinite(id) ? list.find(i => i.id === id) : undefined;

  // хуки до будь-яких return
  const sanitized = useMemo(
    () => sanitizeHtml(item?.answer ?? ''),
    [item?.answer]
  );

  useEffect(() => {
    const root = answerRef.current;
    if (!root) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const href = `${import.meta.env.BASE_URL}icons.svg#icon-triangle`;
    const makeIcon = () => {
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute(
        'class',
        'mt-[8px] w-[12px] h-[12px] shrink-0 fill-fire'
      );
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      const useEl = document.createElementNS(svgNS, 'use');
      useEl.setAttribute('href', href);
      svg.appendChild(useEl);
      return svg;
    };
    root.querySelectorAll(":scope > p:not([data-bullet='1'])").forEach(p => {
      const el = p as HTMLElement;
      if (!el.textContent?.trim()) return;
      const next = el.nextElementSibling as HTMLElement | null;
      const hasList = next && (next.tagName === 'OL' || next.tagName === 'UL');
      if (hasList) {
        const wrap = document.createElement('div');
        wrap.className = 'grid grid-cols-[12px_1fr] gap-x-[11px] items-start';
        const content = document.createElement('div');
        el.parentElement!.insertBefore(wrap, el);
        wrap.appendChild(makeIcon());
        wrap.appendChild(content);
        content.appendChild(el);
        content.appendChild(next!);
        el.dataset.bullet = '1';
        return;
      }
      el.classList.add(
        'grid',
        'grid-cols-[12px_1fr]',
        'gap-x-[11px]',
        'items-start'
      );
      const span = document.createElement('span');
      while (el.firstChild) span.appendChild(el.firstChild);
      el.appendChild(span);
      el.insertBefore(makeIcon(), span);
      el.dataset.bullet = '1';
    });
  }, [sanitized]);

  // редірект на окремий 404-роут
  if (!cat || !Number.isInteger(id) || !item) {
    return (
      <Navigate to="/not-found" replace state={{ from: location.pathname }} />
    );
  }

  // основний рендер
  return (
    <div className="mx-auto w-full xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
      <BackButton to={`/faq/${cat}`} replace className="mb-11.5" />
      <div className="grid grid-cols-[328px_1fr] gap-11.5">
        <FaqCategoryCard
          variant="split"
          title={TITLE[cat]}
          slug={cat}
          icon={
            <svg className={S.icon} aria-hidden focusable="false">
              <use
                href={`${import.meta.env.BASE_URL}icons.svg#${ICON_BY_SLUG[cat]}`}
              />
            </svg>
          }
          questions={list.map(({ id, question }) => ({ id, question }))}
          activeId={id}
          previewCount={8}
        />
        <article aria-labelledby={`q-title-${id}`}>
          <h1 id={`q-title-${id}`} className="sr-only">
            {item.question}
          </h1>
          <div
            ref={answerRef}
            className="[&_strong]:text-fire [&_b]:text-fire leading-[169%] [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-[circle] [&_ul]:pl-5 [&>*+*]:mt-5 [&>ol+p]:mt-5 [&>p+ol]:mt-0 [&>p+ul]:mt-0 [&>ul+p]:mt-5"
            dangerouslySetInnerHTML={{ __html: sanitized }}
          />
        </article>
      </div>
    </div>
  );
}
