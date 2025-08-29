// /faq/:category/:id
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import type { CategorySlug } from "@/features/faq/types";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import { FAQ_ITEMS } from "@/features/faq/content/faqContentCard";
import BackButton from "@/shared/components/UI/BackButton";
import FaqCategoryCard, { S } from "@/features/faq/components/FaqCategoryCard";

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

export default function FaqQuestionPage() {
  const { category: rawCat, id: rawId } = useParams<{ category: string; id: string }>();

  // 1) ХУКИ/дані — БЕЗ умов
  const answerRef = useRef<HTMLDivElement>(null);

  const cat: CategorySlug | null = isCat(rawCat) ? rawCat : null;
  const id = Number(rawId);

  const list = cat ? FAQ_ITEMS.filter(i => i.category === cat) : [];
  const item = Number.isFinite(id) ? list.find(i => i.id === id) : undefined;

  // Санітизація завжди (порожній рядок, якщо item немає)
  const sanitized = DOMPurify.sanitize(item?.answer ?? "", {
    ALLOWED_TAGS: ["p","br","strong","em","ul","ol","li","a","blockquote","code","pre"],
    ALLOWED_ATTR: ["href","title","target","rel"],
  });

  useEffect(() => {
    const root = answerRef.current;
    if (!root) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const href  = `${import.meta.env.BASE_URL}icons.svg#icon-triangle`;

    const makeIcon = () => {
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "mt-[8px] w-[12px] h-[12px] shrink-0 fill-fire");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");

      const useEl = document.createElementNS(svgNS, "use");
      useEl.setAttribute("href", href); // SVG2, сучасні браузери
      // За потреби сумісності зі старими Safari розкоментуй:
      // useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href);

      svg.appendChild(useEl);
      return svg;
    };

    // 1) Обробляємо КОЖЕН <p>
    root.querySelectorAll(":scope > p").forEach((p) => {
      const el = p as HTMLElement;
      if (el.dataset.bullet === "1") return;
      if (!el.textContent?.trim()) return;

      const next = el.nextElementSibling as HTMLElement | null;
      const hasList = next && (next.tagName === "OL" || next.tagName === "UL");

      if (hasList) {
        // Блок: <p> + (ol|ul) → одна іконка на весь блок
        const wrap = document.createElement("div");
        wrap.className = "grid grid-cols-[12px_1fr] gap-x-[11px] items-start";
        const content = document.createElement("div");
        content.className = "";

        el.parentElement!.insertBefore(wrap, el);
        wrap.appendChild(makeIcon());
        wrap.appendChild(content);
        content.appendChild(el);
        content.appendChild(next!);

        el.dataset.bullet = "1";
        return;
      }

      // Звичайний абзац
      el.classList.add("grid","grid-cols-[12px_1fr]","gap-x-[11px]","items-start");
      const span = document.createElement("span");
      while (el.firstChild) span.appendChild(el.firstChild);
      el.appendChild(span);
      el.insertBefore(makeIcon(), span);
      el.dataset.bullet = "1";
    });
  }, [sanitized]);

  // 3) Умовні рендери — ПІСЛЯ викликів хуків
  if (!cat) return <NotFoundPage />;

  if (!item) {
    return (
      <div className="w-full mx-auto xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
        <BackButton className="mb-11.5" />
        <p className="leading-[135%]">Question not found. Please go back to the FAQ.</p>
      </div>
    );
  }

  // 4) Рендер
  return (
    <div className="w-full mx-auto xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
      <BackButton className="mb-11.5" />

      <div className="grid grid-cols-[328px_1fr] gap-11.5">
        {/* Зліва: "пігулка" + список категорії */}
        <FaqCategoryCard
          variant="split"
          title={TITLE[cat]}
          slug={cat}
          icon={
            <svg className={S.icon} aria-hidden focusable="false">
              <use href={`${import.meta.env.BASE_URL}icons.svg#${ICON_BY_SLUG[cat]}`} />
            </svg>
          }
          questions={list.map(({ id, question }) => ({ id, question }))}
          activeId={id}
          previewCount={8}
        />

        {/* Справа: відповідь (тайтл схований) */}
        <article aria-labelledby="q-title">
          <h1 id="q-title" className="sr-only">{item.question}</h1>
          <div
            ref={answerRef}
            className="leading-[169%]
    /* відступ між сусідніми блоками за замовчуванням */
    [&>*+*]:mt-5

    /* але між абзацом і наступним списком — НУЛЬ */
    [&>p+ol]:mt-0
    [&>p+ul]:mt-0

    /* після списку перед наступним абзацом — лишаємо відступ */
    [&>ol+p]:mt-5
    [&>ul+p]:mt-5

    /* стилі списків */
    [&_ol]:list-decimal [&_ol]:pl-6
    [&_ul]:list-[circle]  [&_ul]:pl-5
            "
            dangerouslySetInnerHTML={{ __html: sanitized }}
          />
        </article>
      </div>
    </div>
  );
}
