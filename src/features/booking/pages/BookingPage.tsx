import BookingForm from '@/features/booking/components/BookingForm';
import BookingSpecialistCard from '@/features/booking/components/BookingSpecialistCard';
import {
  bookingSchema,
  BookingSchemaType,
} from '@/features/booking/validation/bookingSchema';
import BackButton from '@/shared/components/UI/BackButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';

const BookingPage = () => {
  const methods = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      locationOption: 'customer',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <section className="mx-auto w-[375px] xl:w-7xl px-4 xl:px-30 pt-10 xl:pt-17 pb-7 xl:pb-18">
        <BackButton label="Назад" className="mb-6 xl:mb-9" />
        <div className="flex flex-col xl:flex-row-reverse gap-6 xl:gap-8">
          <BookingSpecialistCard />
          <BookingForm />
        </div>
      </section>
    </FormProvider>
  );
};

export default BookingPage;
