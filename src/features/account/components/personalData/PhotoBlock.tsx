import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Controller, useFormContext } from 'react-hook-form';
import {
  selectError,
  selectLoading,
  selectSpecInfo,
} from '../../model/selectors';
import { postSpecAvatar } from '../../model/operations';
import toast from 'react-hot-toast';

export default function PhotoBlock() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const specInfo = useAppSelector(selectSpecInfo);

  useEffect(() => {
    if (error) {
      toast.error('Завантаження не вдалося. Будь ласка, спробуйте ще раз.');
    }
  }, [error]);

  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleAvatarChange = async (
    file: File,
    onChange: (fileOrUrl: File | string) => void
  ) => {
    if (!file) return;

    const result = await dispatch(postSpecAvatar({ file }));

    if (postSpecAvatar.fulfilled.match(result)) {
      const url = result.payload.url;
      onChange(url); // оновлюємо поле форми URL з бекенду
      toast.success('Фото успішно завантажено!');
    }
  };

  useEffect(() => {
    if (errors.avatar?.message) {
      toast.error(String(errors.avatar.message), {
        duration: 5000,
      });
    }
  }, [errors.avatar]);

  // const handleRemovePhoto = (onChange: (value: string | null) => void) => {
  //   onChange(null);
  // };

  const avatarUrl = specInfo.avatar_url || null;
  const hasPhoto = Boolean(avatarUrl);
  const ariaLabel = hasPhoto ? 'Редагувати фото' : 'Додати фото';
  const iconHref = hasPhoto
    ? '/icons.svg#icon-photo-change'
    : '/icons.svg#icon-photo-add';
  const iconColorClass = hasPhoto
    ? 'fill-alabaster absolute z-5'
    : 'fill-fire ';

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`border-fire/40 relative flex flex-col items-center justify-center overflow-hidden border-2 xl:h-[364px] xl:w-[272px] xl:rounded-[16px] ${hasPhoto ? 'brightness-70' : ''}`}
      >
        <label
          htmlFor="avatar"
          title={ariaLabel}
          className={`cursor-pointer ${iconColorClass} transition duration-300 ease-in-out hover:scale-115`}
        >
          <svg className="h-32 w-32">
            <use href={iconHref} />
          </svg>
        </label>

        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              disabled={loading}
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                // 1. Оновлюємо значення поля форми об'єктом File.
                field.onChange(file);

                // 2. Примусово запускаємо валідацію поля 'avatar' і чекаємо, поки RHF перевірить файл за допомогою Zod.
                trigger('avatar').then(isValid => {
                  if (isValid) {
                    // 3. Якщо валідація Zod успішна, запускаємо асинхронне завантаження на бекенд.
                    handleAvatarChange(file, field.onChange);
                  }
                  // Якщо валідація не пройшла, RHF оновив об'єкт errors, і завантаження не починається.
                });
              }}
            />
          )}
        />

        {hasPhoto && (
          <img
            src={avatarUrl!}
            alt="Фото фахівця"
            className="h-full w-full object-cover"
            width={272}
            height={364}
          />
        )}
      </div>

      {hasPhoto && (
        <button
          type="button"
          // onClick={() => handleRemovePhoto(field.onChange)}
          className="absolute -bottom-8 mx-auto flex gap-3 transition hover:scale-105"
          aria-label="Видалити фото"
        >
          <svg className="fill-fire hover:fill-fire h-6 w-6 transition">
            <use href="/icons.svg#icon-trash" />
          </svg>
          Видалити фото
        </button>
      )}

      {/* {errors.avatar?.message && (
        <p className="text-red-tenn mt-1 pl-6.5 text-[8px] xl:pl-4 xl:text-[10px]">
          {String(errors.avatar.message)}
        </p>
      )} */}
    </div>
  );
}
