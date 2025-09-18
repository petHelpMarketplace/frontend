// /faq/:category/:id
import { useParams } from "react-router-dom";
import { useEffect, useRef, useMemo} from "react";
import type { CategorySlug } from "@/features/faq/types";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import { FAQ_ITEMS } from "@/features/faq/content/faqContentCard";
import BackButton from "@/shared/components/UI/BackButton";
import FaqCategoryCard, { S } from "@/features/faq/components/FaqCategoryCard";
import { TITLE, ICON_BY_SLUG, isCategorySlug as isCat } from "@/features/faq/constants";
import { sanitizeHtml } from "@/features/faq/purify";

export default function FaqQuestionPage() {
  //Беремо з URL параметри категорії та id питання
  const { category: rawCat, id: rawId } = useParams<{ category: string; id: string }>();

  // 1) ХУКИ/дані — БЕЗ умов
  const answerRef = useRef<HTMLDivElement>(null); // контейнер для відповіді, в який будемо інжектити маркери-іконки

 // Валідація категорії та приведення id до числа
  const cat: CategorySlug | null = isCat(rawCat) ? rawCat : null;
  const id = rawId && /^\d+$/.test(rawId) ? Number(rawId) : NaN;

   // Фільтруємо питання за категорією; шукаємо конкретне питання за id
  const list = cat ? FAQ_ITEMS.filter(i => i.category === cat) : [];
  const item = Number.isFinite(id) ? list.find(i => i.id === id) : undefined;

  // 🔒 Санітизуємо HTML-відповідь (захист від XSS) і мемоємо за текстом відповіді.
  // sanitizeHtml:
  //  - дозволяє лише whitelist-теги/атрибути,
  //  - блокує небезпечні URI (javascript:, data:),
  //  - додає rel="noopener noreferrer" для target="_blank".
 const sanitized = useMemo(
  () => sanitizeHtml(item?.answer ?? ""),
   [item?.answer]
 );

  useEffect(() => {
    // Після кожного оновлення sanitized (тобто новий HTML вже в DOM),
    // пробігаємось по <p> на верхньому рівні і додаємо зліва маленькі SVG-трикутники.
    const root = answerRef.current;
    if (!root) return;

    // Неймспейс і посилання на символ в SVG-спрайті
    const svgNS = "http://www.w3.org/2000/svg";
    const href  = `${import.meta.env.BASE_URL}icons.svg#icon-triangle`;

     // Фабрика створення іконки <svg><use href="..."/></svg>
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

    // 1) Обробляємо КОЖЕН <p> лише на першому рівні вкладеності (":scope > p")
    root.querySelectorAll(":scope > p").forEach((p) => {
      const el = p as HTMLElement;
       // Захист від повторної обробки: якщо вже ставили маркер — пропускаємо
      if (el.dataset.bullet === "1") return;
       // Порожні абзаци не маркуємо
      if (!el.textContent?.trim()) return;
 // Якщо після <p> одразу йде <ol> або <ul> — це логічний блок "текст + список".
      // В такому випадку робимо один "wrap" з іконкою зліва для всього блоку.
      const next = el.nextElementSibling as HTMLElement | null;
      const hasList = next && (next.tagName === "OL" || next.tagName === "UL");

      if (hasList) {
        // Блок: <p> + (ol|ul) → одна іконка на весь блок
        const wrap = document.createElement("div");
        wrap.className = "grid grid-cols-[12px_1fr] gap-x-[11px] items-start";
        const content = document.createElement("div");
        content.className = ""; // можна додати додаткові класи якщо потрібно

 // Вставляємо обгортку перед <p>, потім переносимо <p> і список всередину
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
         // Обгортаємо наявний контент у <span>, щоб вставити іконку перед ним
      const span = document.createElement("span");
      while (el.firstChild) span.appendChild(el.firstChild);
      el.appendChild(span);
           // Вставляємо іконку на початок абзацу
      el.insertBefore(makeIcon(), span);
       // Позначаємо, що абзац уже оброблено
      el.dataset.bullet = "1";
    });
  }, [sanitized]); // залежність: перераховуємо іконки, коли оновлюється відрендерений HTML

  // 3) Умовні рендери — ПІСЛЯ викликів хуків
  if (!cat) return <NotFoundPage />;

   // Якщо питання з таким id у цій категорії не знайдено — показуємо fallback-контент із кнопкою "Назад"
  if (!item) {
    return (
      <div className="mx-auto w-full xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
        <BackButton
          to={cat ? `/faq/${cat}` : '/faq'}
          replace
          className="mb-11.5"
        />
        <p className="leading-[135%]">
          Питання не знайдено. Будь ласка, поверніться до розділу FAQ.
        </p>
      </div>
    );
  }

 // 4) Основний рендер сторінки:
  // Ліва колонка — картка категорії з переліком питань
  // Права колонка — контент відповіді (рендеримо санітизований HTML через dangerouslySetInnerHTML)
  return (
    <div className="mx-auto w-full xl:max-w-[1280px] xl:px-[120px] xl:pt-17 xl:pb-18">
      <BackButton to={`/faq/${cat}`} replace className="mb-11.5" />
      <div className="grid grid-cols-[328px_1fr] gap-11.5">
        {/* Зліва: "пігулка" + список категорії */}
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

        {/* Справа: відповідь (тайтл схований) */}
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
