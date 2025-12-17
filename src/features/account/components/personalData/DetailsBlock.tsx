import { useFormContext } from 'react-hook-form';

export default function DetailsBlock() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <div className="flex w-full flex-col">
        <label
          htmlFor="bio"
          className="text-fire mb-5 block text-xl font-semibold"
        >
          Про себе
        </label>
        <textarea
          id="bio"
          rows={6}
          className="input-base flex h-12 w-full flex-1 resize-none px-7 py-6"
          placeholder="Приклад: Привіт! Я Ігор, з дитинства обожнюю тварин, особливо собак. Маю досвід у вигулі та догляді ..."
          {...register('bio')}
        />
      </div>
      {errors.bio?.message && (
        <p className="text-red-tenn absolute mt-1 pl-6.5 text-[8px] xl:pl-4 xl:text-[10px]">
          {String(errors.bio.message)}
        </p>
      )}
    </div>
  );
}
