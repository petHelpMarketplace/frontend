import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const LOCAL_STORAGE_KEY = 'userPhotoPreview';

export default function PhotoBlock() {
  const [preview, setPreview] = useState<string | null>(null);

  // // Завантаження з localStorage при монтуванні
  // useEffect(() => {
  //   const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   if (saved) {
  //     setPreview(saved);
  //   }
  // }, []);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  // const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64 = reader.result as string;
  //     setPreview(base64);
  //     localStorage.setItem(LOCAL_STORAGE_KEY, base64);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleRemovePhoto = () => {
    setPreview(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const hasPhoto = Boolean(preview);
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
          htmlFor="photo"
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
              id="photo"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                field.onChange(file); // передаємо File у форму

                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result as string;
                  setPreview(base64);
                  localStorage.setItem(LOCAL_STORAGE_KEY, base64);
                };
                reader.readAsDataURL(file);
              }}
            />
          )}
        />

        {hasPhoto && (
          <img
            src={preview!}
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
          onClick={handleRemovePhoto}
          className="absolute -bottom-8 mx-auto flex gap-3 transition hover:scale-105"
          aria-label="Видалити фото"
        >
          <svg className="fill-fire hover:fill-fire h-6 w-6 transition">
            <use href="/icons.svg#icon-trash" />
          </svg>
          Видалити фото
        </button>
      )}

      {errors.avatar?.message && (
        <p className="text-red-tenn mt-1 pl-6.5 text-[8px] xl:pl-4 xl:text-[10px]">
          {String(errors.avatar.message)}
        </p>
      )}
    </div>
  );
}
