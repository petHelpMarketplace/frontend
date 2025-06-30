import SpecialistInfo from '@/features/booking/components/SpecialistInfo';
import SpecialistReview from '@/features/booking/components/SpecialistReview';

const BookingSpecialistCard = () => {
  return (
    <div className="flex flex-col xl:w-[316px] px-5 py-4 xl:p-[22px] box-border rounded-2xl shadow-[0_1px_4px_4px_rgba(0,0,0,0.25)]">
      <SpecialistInfo />
      <SpecialistReview />
    </div>
  );
};

export default BookingSpecialistCard;
