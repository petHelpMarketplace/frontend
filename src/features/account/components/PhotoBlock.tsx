import { useState } from 'react';

export default function PhotoBlock() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPreview(null);
  };

  return (
    <div className="relative w-[272px] h-[364px] overflow-hidden border-[2px] border-fire rounded-[16px] flex flex-col items-center justify-center">
      {preview ? (
        <img
          src={preview}
          alt="Фото фахівця"
          className="object-cover w-full h-full"
          width={248}
          height={248}
        />
      ) : (
        <svg className="w-35 h-35 fill-fire">
          <use href="/icons.svg#icon-acc-placeholder" />
        </svg>
      )}
      {photo && (
        <button
          type="button"
          onClick={handleRemovePhoto}
          className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray--4 transition"
          aria-label="Видалити фото"
        >
          <svg className="w-5 h-5 fill-gray--2 hover:fill-fire transition">
            <use href="/icons.svg#icon-delete" />
          </svg>
        </button>
      )}

      <label
        htmlFor="photo"
        className="cursor-pointer flex items-center gap-2 text-fire hover:text-tenn font-medium transition"
      >
        <svg className="w-5 h-5 fill-current">
          <use href="/icons.svg#icon-plus" />
        </svg>
        Додати фото
      </label>
      <input
        type="file"
        id="photo"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
    </div>
  );
}
