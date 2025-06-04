import { SpecialistMock } from '../types';
import { useRef, useEffect, useState } from 'react';

interface Props {
  images: SpecialistMock;
}

export const SpecialistPetsCarousel = ({ images }: Props) => {
  const { petsPhotos, iconLeft, iconRight } = images;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1); // -1 для точності
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Слухаємо скрол
    const handleScroll = () => checkScroll();
    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScroll);

    // Перевірка при монтуванні
    checkScroll();

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Горизонтальна прокрутка колесом мишки
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      scrollContainer.scrollBy({
        left: e.deltaY * 10,
      });
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (!petsPhotos || petsPhotos.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="container">
        <h2 className="text-center text-xl font-semibold uppercase text-fire mb-10">
          Задоволені улюбленці
        </h2>

        <div className="relative fill-fire">
          {/* Кнопка вліво */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Прокрутити вліво"
            style={{
              opacity: canScrollLeft ? 1 : 0.3,
              pointerEvents: canScrollLeft ? 'auto' : 'none',
            }}
          >
            <svg width="24" height="26">
              <use href={`/icons.svg#${iconLeft}`} />
            </svg>
          </button>

          {/* Слайдер */}
          <div
            ref={scrollRef}
            className="flex gap-[32px] overflow-x-auto scroll-smooth no-scrollbar max-w-[980px] mx-auto"
          >
            {petsPhotos.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Pet ${index + 1}`}
                className="w-55 h-55 object-cover rounded-xl shrink-0"
                width={220}
                height={220}
              />
            ))}
          </div>

          {/* Кнопка вправо */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Прокрутити вправо"
            style={{
              opacity: canScrollRight ? 1 : 0.3,
              pointerEvents: canScrollRight ? 'auto' : 'none',
            }}
          >
            <svg width="24" height="26">
              <use href={`/icons.svg#${iconRight}`} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
