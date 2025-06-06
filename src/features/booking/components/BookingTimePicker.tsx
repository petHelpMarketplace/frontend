import { timeSlots } from '@/features/booking/constants/bookingTime';
import { useFormContext } from 'react-hook-form';

const BookingTimePicker = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="xl:text-xl xl:font-semibold text-fire xl:mb-5">
        Час виконання замовлення
      </h2>
      <div className="relative">
        <fieldset className="flex gap-2">
          <legend className="sr-only">Оберіть час</legend>
          {timeSlots.map((slot, index) => {
            return (
              <label
                key={index}
                className="h-10 flex items-center gap-2 leading-none text-sm px-[10px] w-[132px] border-2 border-fire rounded-2xl hover:cursor-pointer"
              >
                <input
                  type="checkbox"
                  {...register('time')}
                  value={slot}
                  className="book-checkbox-btn sr-only"
                />
                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] border-2 border-fire">
                  <svg className="w-4 h-3">
                    <use href="/icons.svg#icon-tick" />
                  </svg>
                </span>
                {slot}
              </label>
            );
          })}
        </fieldset>

        {errors.time?.message && (
          <p className="absolute text-red-tenn text-[10px] pl-4 mt-1">
            {String(errors.time.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingTimePicker;
