import { Link, useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  totalPages: number;
};

const DOTS = '...';

const Pagination = ({ totalPages }: Props) => {
  const {pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const total = totalPages || 1;
  const currentPage = Math.max(
    1,
    Math.min(Number(searchParams.get('page')) || 1, total)
  );

  if (total <= 1) return null;

  const toPage = (p: number) => {
    const next = new URLSearchParams(search); // зберігаємо ВСІ існуючі query (district, інші фільтри)
    next.set('page', String(p));
    return { pathname, search: `?${next.toString()}` };
  };


  const generatePageRange = () => {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push(DOTS, total);
      return pages;
    }
    if (currentPage >= total - 3) {
      pages.push(1, DOTS);
      for (let i = total - 4; i <= total; i++) pages.push(i);
      return pages;
    }
    pages.push(1, DOTS);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push(DOTS, total);
    return pages;
  };



  return (
    <nav
      className="flex justify-center items-center gap-5 xl:gap-[30px] select-none mb-10 xl:mb-[58px]"
      role="navigation"
      aria-label="Пагінація"
      aria-live="polite"
    >
      {/* ← Prev */}
      {currentPage === 1 ? (
        <span
          aria-disabled="true"
          className="w-[22px] h-[22px] xl:w-[27px] xl:h-[27px] flex items-center justify-center rounded opacity-50 pointer-events-none fill-fire"
        >
          <svg className="w-[10px] h-[19px]">
            <use href="/icons.svg#icon-arrow-left" />
          </svg>
        </span>
      ) : (
        <Link
          to={toPage(currentPage - 1)} 
          aria-label="Попередня сторінка"
          className="w-[22px] h-[22px] xl:w-[27px] xl:h-[27px] flex items-center justify-center rounded transition-opacity fill-fire"
        >
          <svg className="w-[10px] h-[19px]">
            <use href="/icons.svg#icon-arrow-left" />
          </svg>
        </Link>
      )}

      {/* Цифри */}
      <ul className="flex items-center gap-2">
        {generatePageRange().map((page, i) => (
          <li key={page === DOTS ? `dots-${i}` : `page-${page}`}>
            {page === DOTS ? (
              <span
                className="min-w-[20px] h-[20px] xl:min-w-[27px] xl:h-[27px] flex items-center justify-center text-lg xl:text-xl text-fire leading-none pointer-events-none select-none"
                aria-hidden="true"
              >
                {DOTS}
              </span>
            ) : Number(page) === currentPage ? (
              <span
                aria-current="page"
                className="
                  min-w-[28px] h-[28px] xl:min-w-[30px] xl:h-[30px]
                  flex items-center justify-center rounded
                  text-center text-fire leading-none 
                  text-lg xl:text-[22px] font-bold scale-125
                  border border-transparent
                "
              >
                {page}
              </span>
            ) : (
              <Link
                to={toPage(Number(page))} 
                aria-label={`Перейти на сторінку ${page}`}
                className="
                  min-w-[28px] h-[28px] xl:min-w-[30px] xl:h-[30px]
                  flex items-center justify-center rounded
                  text-center text-fire leading-none 
                  text-lg xl:text-[22px] font-semibold
                  transition-all duration-150
                  border border-transparent hover:border-fire 
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-fire
                "
              >
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* → Next */}
      {currentPage === total ? (
        <span
          aria-disabled="true"
          className="w-[22px] h-[22px] xl:w-[27px] xl:h-[27px] flex items-center justify-center rounded opacity-50 pointer-events-none fill-fire"
        >
          <svg className="w-[10px] h-[19px]">
            <use href="/icons.svg#icon-arrow-right" />
          </svg>
        </span>
      ) : (
        <Link
          to={toPage(currentPage + 1)} 
          aria-label="Наступна сторінка"
          className="w-[22px] h-[22px] xl:w-[27px] xl:h-[27px] flex items-center justify-center rounded transition-opacity fill-fire"
        >
          <svg className="w-[10px] h-[19px]">
            <use href="/icons.svg#icon-arrow-right" />
          </svg>
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
