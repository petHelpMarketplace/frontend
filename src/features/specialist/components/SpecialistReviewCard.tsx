import { ReviewMock } from '../types';
import { formatDate } from '@/shared/utils/formatDate';
import RatingStars from '@/shared/components/UI/RatingStars';

interface Props {
  review: ReviewMock;
}

export const ReviewCard = ({ review }: Props) => {
  const { name, date, service, comment, rating } = review;

  return (
    <div className="flex gap-[51px] rounded-[16px] px-8 py-7 bg-alabaster shadow-smoke">
      <div className="flex flex-col min-w-[136px]">
        <h3 className="font-semibold text-xl text-fire mb-[21px]">{name}</h3>
        <div className="flex gap-1 mb-4 text-fire">
          <RatingStars rating={rating} readOnly />
        </div>
        <span className="text-shark">{formatDate(date)}</span>
      </div>

      <div className="text-fire">
        <p className="mb-[21px] font-semibold">
          Відгук на послугу:{' '}
          <span className="font-medium text-shark">{service}</span>
        </p>
        <p className="text-shark text-justify">{comment}</p>
      </div>
    </div>
  );
};
