import mockReviewsData from '@/data/bookReviewMock';
import RatingStars from '@/shared/components/UI/RatingStars';
import { useFormContext } from 'react-hook-form';

const SpecialistReview = () => {
  const latestReviews = [...mockReviewsData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const { watch } = useFormContext();

  const selectedLocationOption = watch('locationOption');
  const lineClamp =
    selectedLocationOption === 'customer' ? 'line-clamp-8' : 'line-clamp-5';

  return (
    <div className="hidden xl:block">
      <h2 className="text-xl font-semibold text-fire mb-5 text-center">
        Останні відгуки
      </h2>
      {latestReviews.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {latestReviews.map((review, index) => {
            return (
              <li key={index}>
                <div className="flex gap-4 items-center mb-2">
                  <p className=" font-semibold">{review.name}</p>
                  <RatingStars
                    readOnly
                    rating={review.rating}
                    aria-label={`Рейтинг: ${review.rating}`}
                  />
                </div>
                <p
                  className={`text-sm text-mineShaft text-justify ${lineClamp}`}
                >
                  {review.comment}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-sm text-storm-gray">
          У фахівця ще немає відгуків
        </p>
      )}
    </div>
  );
};

export default SpecialistReview;
