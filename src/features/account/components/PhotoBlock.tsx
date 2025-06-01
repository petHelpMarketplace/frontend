import { useState, useEffect } from 'react';

export default function PhotoBlock() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    // Очищаємо попередній URL, коли компонент демонтується або коли preview змінюється
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Очищаємо попередній URL перед створенням нового
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    if (preview) {
      URL.revokeObjectURL(preview); // Очищаємо URL об'єкта перед видаленням
    }
    setPhoto(null);
    setPreview(null);
  };

  return (
    <>
      <div className="relative w-[272px] h-[364px] overflow-hidden border-[2px] border-fire rounded-[16px] flex flex-col items-center justify-center mb-3">
        {preview ? (
          <img
            src={preview}
            alt="Фото фахівця"
            className="object-cover w-full h-full"
            width={272}
            height={364}
          />
        ) : (
          <svg className="w-32 h-32 fill-fire">
            <use href="/icons.svg#icon-acc-placeholder" />
          </svg>
        )}
        <label
          htmlFor="photo"
          title={
            preview ? 'Редагувати фото' : 'Додати фото'
          } /* Змінюємо title */
          className="absolute top-3.5 right-3.5 cursor-pointer flex items-center gap-2 fill-fire/50 font-medium transition"
        >
          <svg className="w-5 h-5 hover:scale-115 hover:fill-fire">
            {/* Умовний рендеринг іконки в залежності від наявності preview */}
            <use
              href={
                preview
                  ? '/icons.svg#icon-acc-photo-edit'
                  : '/icons.svg#icon-acc-photo-add'
              }
            />
          </svg>
        </label>

        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
          aria-label={
            preview ? 'Редагувати фото' : 'Додати фото'
          } /* Змінюємо aria-label */
        />
      </div>
      {photo && (
        <button
          type="button"
          onClick={handleRemovePhoto}
          className="flex items-center gap-3 mx-auto hover:scale-125 transition"
          aria-label="Видалити фото"
        >
          <svg className="w-6 h-6 fill-fire hover:fill-fire transition">
            <use href="/icons.svg#icon-acc-photo-delete" />
          </svg>
          Видалити фото
        </button>
      )}
    </>
  );
}
