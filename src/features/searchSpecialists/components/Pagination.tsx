import { useSearchParams } from 'react-router-dom';

type Props = {
  totalPages: number;
};

const DOTS = '...';

const Pagination = ({ totalPages}: Props) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1
  
  if (totalPages <= 1) return null; 

  ;

  const generatePageRange = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push(DOTS, totalPages);
      return pages;
    }
    if (currentPage >= totalPages - 3) {
      pages.push(1, DOTS);
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1, DOTS);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push(DOTS, totalPages);
    return pages;
  };

  // const handleClick = (page: number | string) => {
  //   if (page !== DOTS && page !== currentPage) onChange(Number(page));
  // };

  return (
    <nav
    className="flex justify-center items-center gap-5 xl:gap-[30px] select-none"
    role="navigation"
    aria-label="Пагінація"
    aria-live="polite"
  >
    {/* ← */}
    <a
      href={`?page=${currentPage - 1}`}
      aria-label="Попередня сторінка"
      className={`w-[22px] h-[22px] xl:w-[27px] xl:h-[27px] flex items-center justify-center rounded transition-opacity fill-fire ${
        currentPage === 1 ? ' opacity-50 pointer-events-none' : ''
      }`}
    >
      <svg className="w-[10px] h-[19px]">
        <use href="/icons.svg#icon-arrow-left" />
      </svg>
    </a>
  
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
          ) : (
            <a
              href={`?page=${page}`}
              aria-label={`Перейти на сторінку ${page}`}
              aria-current={Number(page) === currentPage ? 'page' : undefined}
              className={`
                min-w-[28px] h-[28px] xl:min-w-[30px] xl:h-[30px]
                flex items-center justify-center rounded
                text-center text-fire leading-none 
                text-lg xl:text-[22px] transition-all duration-150
                border border-transparent hover:border-fire 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-fire
                ${Number(page) === currentPage ? 'font-bold scale-125' : 'font-semibold'}
              `}
            >
              {page}
            </a>
          )}
        </li>
      ))}
    </ul>
  
    {/* → */}
    <a
      href={`?page=${currentPage + 1}`}
      aria-label="Наступна сторінка"
      className={`w-[22px] h-[22px] xl:w-[27px] xl:h-[27px] flex items-center justify-center rounded transition-opacity fill-fire ${
        currentPage === totalPages ? 'opacity-50 pointer-events-none ' : ''
      }`}
    >
      <svg className="w-[10px] h-[19px]">
        <use href="/icons.svg#icon-arrow-right" />
      </svg>
    </a>
  </nav>
  
  );
};

export default Pagination;
