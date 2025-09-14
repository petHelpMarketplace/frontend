import { useState } from 'react';
import { ReviewCard } from './SpecialistReviewCard';
import { ReviewMock } from '../types';

interface Props {
  reviews: ReviewMock[];
}

const arrowMore = {
  title: 'Більше відгуків',
  titleBack: 'Згорнути відгуки',
  icon: 'icon-arrow-bottom',
};

export const ReviewsList = ({ reviews }: Props) => {
  const initialCount = 3;
  const totalCount = reviews.length;

  const [visibleCount, setVisibleCount] = useState(initialCount);

  // Якщо немає відгуків, показуємо повідомлення
  if (totalCount === 0) {
    return (
      <div className="text-center text-lg text-shark py-10">
        Ще немає відгуків. Будьте першим, хто залишить відгук!
      </div>
    );
  }
  // Сортуємо відгуки за датою
  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // новіші спочатку
  });

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const isFullyExpanded = visibleCount >= totalCount;

  // Функція для обробки натискання кнопки "Показати більше"
  const handleToggle = () => {
    if (isFullyExpanded) {
      setVisibleCount(initialCount);
    } else {
      setVisibleCount(prev => Math.min(prev + 3, totalCount));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {visibleReviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {totalCount > initialCount && (
        <button
          onClick={handleToggle}
          className="self-center px-6 py-2 text-shark hover:underline hover:fill-fire flex items-center gap-3 transition"
          title={isFullyExpanded ? arrowMore.titleBack : arrowMore.title}
        >
          {isFullyExpanded ? 'Згорнути' : `Всі відгуки (${totalCount})`}
          <svg
            className={`hover:fill-fire transition-transform ${isFullyExpanded ? 'rotate-180' : ''}`}
            width="22"
            height="12"
            aria-hidden="true"
          >
            <use href={`/icons.svg#${arrowMore.icon}`} />
          </svg>
        </button>
      )}
    </div>
  );
};
