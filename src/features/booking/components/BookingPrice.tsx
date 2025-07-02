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
      <h2 className="text-lg xl:text-xl font-semibold text-fire mb-4 xl:mb-5">
        Ціна замовлення
      </h2>
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="flex xl:flex-col items-center gap-7.5 xl:justify-between rounded-2xl xl:min-w-[200px] text-center xl:bg-tenn xl:p-[22px]">
          <p className="text-sm text-cod-gray xl:text-alabaster">
            Орієнтовна вартість
          </p>
          <p className="w-[136px] xl:w-full text-lg xl:text-xl text-cod-gray bg-alabaster rounded-2xl py-1 xl:py-[6px] border-2 border-tenn xl:border-none">
            650 грн
          </p>
          <p className="hidden xl:block text-sm text-alabaster">
            Ціна обговорюється
          </p>
        </div>

        <div className="flex flex-col gap-4 xl:gap-3">
          <div className="relative">
            <input
              type="email"
              {...register('email')}
              placeholder="Email для зворотного зв’язку"
              aria-label="Email для зворотного зв’язку"
              className="input-base h-12 pl-6.5 xl:pl-12"
            />

            {errors.email?.message && (
              <p className="absolute text-red-tenn text-[10px] pl-6.5 xl:pl-12">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          <p className="text-xs xl:text-sm text-chicago-gray leading-[158%] xl:leading-[136%] text-justify">
            Вартість вказана лише для попередньої оцінки бюджету вашого
            замовлення. В неї не включені матеріали та додаткові роботи. Точну
            вартість зможе сказати фахівець після обговорення деталей.
          </p>

          <Button
            label="Замовити"
            aria-label="Замовити"
            type="submit"
            className="xl:self-end"
            // disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPrice;
