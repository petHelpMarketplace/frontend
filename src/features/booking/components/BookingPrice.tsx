import Button from '@/shared/components/UI/Button';
import { useFormContext } from 'react-hook-form';

const BookingPrice = () => {
  const {
    register,
    formState: {
      errors,
      // isValid
    },
  } = useFormContext();

  return (
    <div>
      <h2 className="xl:text-xl xl:font-semibold text-fire xl:mb-5">
        Ціна замовлення
      </h2>
      <div className="flex gap-5">
        <div className="flex flex-col justify-between rounded-2xl xl:min-w-[200px] text-center bg-tenn p-[22px]">
          <p className="text-sm text-alabaster">Орієнтовна вартість</p>
          <p className="text-xl text-cod-gray bg-alabaster rounded-2xl py-[6px]">
            650 грн
          </p>
          <p className="text-sm text-alabaster">Ціна обговорюється</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="email"
              {...register('email')}
              placeholder="Email для зворотного зв’язку"
              aria-label="Email для зворотного зв’язку"
              className="input-base h-12 pl-12"
            />

            {errors.email?.message && (
              <p className="absolute text-red-tenn text-[10px] pl-12">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          <p className="text-sm text-chicago-gray leading-[19px] text-justify">
            Вартість вказана лише для попередньої оцінки бюджету вашого
            замовлення. В неї не включені матеріали та додаткові роботи. Точну
            вартість зможе сказати фахівець після обговорення деталей.
          </p>

          <Button
            label="Замовити"
            aria-label="Замовити"
            type="submit"
            className="self-end"
            // disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPrice;
