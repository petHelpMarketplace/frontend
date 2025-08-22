import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'userPhotoPreview';

export default function PhotoBlock() {
  const [preview, setPreview] = useState<string | null>(null);

  // Завантаження з localStorage при монтуванні
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setPreview(saved);
    }
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      localStorage.setItem(LOCAL_STORAGE_KEY, base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const hasPhoto = Boolean(preview);
  const ariaLabel = hasPhoto ? 'Редагувати фото' : 'Додати фото';
  // const iconHref = hasPhoto
  //   ? '/icons.svg#icon-pencil'
  //   : '/icons.svg#icon-acc-photo-add';
  const iconColorClass = hasPhoto
    ? 'fill-alabaster absolute z-5'
    : 'fill-fire ';

  return (
    <div className="relative flex flex-col items-center ">
      <div
        className={`relative xl:w-[272px] xl:h-[364px] overflow-hidden border-2 border-fire/40 xl:rounded-[16px] flex flex-col items-center justify-center 
        ${hasPhoto ? 'brightness-70' : ''}`}
      >
        <label
          htmlFor="photo"
          title={ariaLabel}
          className={`cursor-pointer ${iconColorClass} hover:scale-115 transition duration-300`}
        >
          <svg className="w-32 h-32">
            <use href="/icons.svg#icon-placeholder" />
          </svg>
        </label>

        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
          aria-label={ariaLabel}
        />

        {hasPhoto && (
          <img
            src={preview!}
            alt="Фото фахівця"
            className="object-cover w-full h-full "
            width={272}
            height={364}
          />
        )}

        {/* {hasPhoto ? (
          <img
            src={preview!}
            alt="Фото фахівця"
            className="object-cover w-full h-full"
            width={272}
            height={364}
          />
        ) : (
          <svg className="w-32 h-32 fill-fire">
            <use href="/icons.svg#icon-placeholder" />
          </svg>
        )} */}

        {/* <label
          htmlFor="photo"
          title={ariaLabel}
          className={`absolute top-3.5 right-3.5 cursor-pointer flex items-center gap-2 ${iconColorClass} font-medium transition`}
        >
          <svg className="w-5 h-5">
            <use href={iconHref} />
          </svg>
        </label>

        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
          aria-label={ariaLabel}
        /> */}
      </div>

      {hasPhoto && (
        <button
          type="button"
          onClick={handleRemovePhoto}
          className="absolute -bottom-8 flex gap-3 mx-auto hover:scale-105 transition"
          aria-label="Видалити фото"
        >
          <svg className="w-6 h-6 fill-fire hover:fill-fire transition">
            <use href="/icons.svg#icon-trash" />
          </svg>
          Видалити фото
        </button>
      )}
    </div>
  );
}
