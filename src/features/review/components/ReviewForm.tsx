import { ReviewSchemaType } from '@/features/review/validation/reviewSchema';
import RatingStars from '@/shared/components/UI/RatingStars';
import ChooseService from '@/features/review/components/ChooseService';
import { Controller, useFormContext } from 'react-hook-form';
import { ratingLabels } from '@/shared/constants/ratingLabels';
import toast from 'react-hot-toast';

const ReviewForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ReviewSchemaType>();

  // TODO Delete console.log when API is connected
  const onSubmit = (data: ReviewSchemaType) => {
    console.log('Form data:', data);
    toast.success(`🐾 Дякуємо! 🐾
      Ваш відгук уже в лапках 🐕‍🦺 або 🐈‍⬛.
`);
  };

  return (
    <form
      id="reviewForm"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col xl:gap-[30px] xl:row-span-2"
    >
      <div>
        <h1 className="xl:text-xl xl:font-semibold text-fire xl:mb-5 xl:leading-[135%]">
          Оцініть послугу
        </h1>
        <Controller
          name="rating"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <RatingStars
              readOnly={false}
              size="w-[35px] h-[35px]"
              className="flex justify-between w-[467px]"
              rating={field.value}
              onRate={val => field.onChange(val)}
              labels={ratingLabels}
            />
          )}
        />
        {errors.rating?.message && (
          <p className="absolute text-red-tenn xl:text-[10px] xl:mt-1">
            {String(errors.rating.message)}
          </p>
        )}
      </div>

      <div className="flex flex-col xl:gap-5">
        <h2 className="xl:text-xl xl:font-semibold text-fire xl:leading-[135%]">
          Замовник послуги
        </h2>
        <label htmlFor="name" className="flex xl:gap-[6px] items-center">
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Ім'я"
              className="input-base xl:w-[472px] xl:h-[48px] xl:px-11 xl:py-[11px]"
              {...register('name')}
            />
            <svg className="w-6 h-6 absolute fill-none stroke-mountain-400 right-[32px] top-1/2 transform -translate-y-1/2">
              <use href="/icons.svg#icon-pencil" />
            </svg>
            {errors.name?.message && (
              <p className="absolute text-red-tenn xl:text-[10px] xl:pl-12 xl:mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>
          <svg className="w-[13px] h-[13px] fill-fire">
            <use href="/icons.svg#icon-required" />
          </svg>
        </label>

        <label htmlFor="lastName" className="flex gap-[6px] items-center">
          <div className="relative">
            <input
              id="lastName"
              type="text"
              placeholder="Прізвище"
              className="input-base w-[472px] h-[48px] px-[44px] py-[11px]"
              {...register('lastName')}
            />
            <svg className="w-6 h-6 absolute fill-none stroke-mountain-400 right-[32px] top-1/2 transform -translate-y-1/2">
              <use href="/icons.svg#icon-pencil" />
            </svg>
            {errors.lastName?.message && (
              <p className="absolute text-red-tenn text-[10px] pl-12 mt-1">
                {String(errors.lastName.message)}
              </p>
            )}
          </div>
        </label>

        <ChooseService />
      </div>

      <div>
        <h2 className="xl:text-xl xl:font-semibold text-fire xl:mb-5 leading-[135%]">
          Відгук на послугу
        </h2>
        <textarea
          placeholder="Приклад: Ігор максимально відповідальний та приємний чоловік, замовлення виконано відповідно до наданих інструкцій..."
          className="input-base w-full h-[188px] resize-none p-4 block overflow-y-auto"
          {...register('review')}
        ></textarea>
        {errors.review?.message && (
          <p className="absolute text-red-tenn text-[10px] pl-4 mt-1">
            {String(errors.review.message)}
          </p>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
