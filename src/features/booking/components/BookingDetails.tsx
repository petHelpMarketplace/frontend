import { useFormContext } from 'react-hook-form';

const BookingDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-lg xl:text-xl font-semibold text-fire mb-4 xl:mb-5">
        Деталі замовлення
      </h2>
      <label htmlFor="orderDetails" className="sr-only">
        Введіть деталі замовлення
      </label>
      <textarea
        {...register('details')}
        id="orderDetails"
        rows={6}
        className="relative input-base min-h-[186px] resize-none p-4 block overflow-y-auto"
        placeholder="Приклад: порода собаки, вимоги до виконавця, особливості собаки, розмір собаки, вік улюбленця та ін."
      ></textarea>

      {errors.details?.message && (
        <p className="absolute text-red-tenn text-[10px] pl-6.5 xl:pl-4 mt-1">
          {String(errors.details.message)}
        </p>
      )}
    </div>
  );
};

export default BookingDetails;
