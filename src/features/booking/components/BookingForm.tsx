import BookingCategory from '@/features/booking/components/BookingCategory';
import BookingDatePicker from '@/features/booking/components/BookingDatePicker';
import BookingDetails from '@/features/booking/components/BookingDetails';
import BookingLocation from '@/features/booking/components/BookingLocation';
import BookingPrice from '@/features/booking/components/BookingPrice';
import BookingTimePicker from '@/features/booking/components/BookingTimePicker';
import { BookingSchemaType } from '@/features/booking/validation/bookingSchema';
// import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const BookingForm = () => {
  const methods = useFormContext<BookingSchemaType>();

  // TODO - delete before release
  // // ✅ DEBUG: лог помилок
  // const {
  //   formState: { errors },
  // } = methods;

  // useEffect(() => {
  //   console.log('Form errors:', errors);
  // }, [errors]);

  const onSubmit = (data: BookingSchemaType) => {
    console.log('Form data:', data);
  };

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 xl:gap-[30px] xl:w-[692px]"
      noValidate
    >
      <BookingCategory />
      <BookingLocation />
      <BookingDetails />
      <BookingDatePicker />
      <BookingTimePicker />
      <BookingPrice />
    </form>
  );
};

export default BookingForm;
