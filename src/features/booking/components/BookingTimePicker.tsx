import { timeSlots } from '@/features/booking/constants/bookingTime';
import { useFormContext } from 'react-hook-form';

const BookingTimePicker = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-lg xl:text-xl font-semibold text-fire mb-4 xl:mb-5">
        Час виконання замовлення
      </h2>
      <div className="relative">
        <fieldset className="flex gap-x-10 gap-y-2 xl:gap-2 justify-center flex-wrap">
          <legend className="sr-only">Оберіть час</legend>
          {timeSlots.map((slot, index) => {
            const isAnyTime = slot === 'Будь-коли';

            return (
              <label
                key={index}
                className={`h-10 flex items-center gap-2 leading-none text-sm px-[10px] w-[132px] border-2 border-fire rounded-2xl hover:cursor-pointer ${
                  isAnyTime ? 'order-last xl:order-first' : ''
                }`}
              >
                <input
                  type="checkbox"
                  {...register('time')}
                  value={slot}
                  className="book-checkbox-btn sr-only"
                />
                <span className="flex items-center justify-center w-5 h-5 rounded-sm border-2">
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
          <p className="absolute text-red-tenn text-[10px] pl-6.5 xl:pl-4 mt-1">
            {String(errors.time.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingTimePicker;
