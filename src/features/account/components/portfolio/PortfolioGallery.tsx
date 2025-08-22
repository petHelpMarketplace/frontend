import { useState, useEffect } from 'react';
import { compressImage } from '@/shared/utils/compressImage';
import PortfolioSlot from './PortfolioSlot';

const LOCAL_STORAGE_KEY = 'userPortfolioPhotos';
const MAX_PHOTOS = 10;

export default function PortfolioGallery() {
  const [photos, setPhotos] = useState<string[]>([]);

  // Завантажити збережені фото з localStorage при монтуванні
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setPhotos(parsed);
      } catch (err) {
        console.error('Помилка при зчитуванні фото з localStorage', err);
      }
    }
  }, []);

  const savePhotosToStorage = (newPhotos: string[]) => {
    setPhotos(newPhotos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPhotos));
  };

  const handlePhotosChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (photos.length >= MAX_PHOTOS) {
      alert('Максимум 10 фото можна завантажити.');
      return;
    }

    try {
      const availableSlots = MAX_PHOTOS - photos.length;
      const filesToProcess = files.slice(0, availableSlots);

      const compressedImages = await Promise.all(
        filesToProcess.map(file => compressImage(file, 1024, 0.7)) // maxWidth: 1024px, quality: 0.7
      );

      const updated = [...photos, ...compressedImages];
      savePhotosToStorage(updated);
    } catch (error) {
      console.error('Помилка під час обробки зображень', error);
      alert('Не вдалося обробити одне або більше зображень.');
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    savePhotosToStorage(updated);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-12.5 gap-y-9">
      {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
        const photo = photos[index];

        // Слот "додати фото"
        if (!photo && index === photos.length) {
          return (
            <PortfolioSlot key={index} isAddSlot onAdd={handlePhotosChange} />
          );
        }

        // Фото
        if (photo) {
          return (
            <PortfolioSlot
              key={index}
              photo={photo}
              onRemove={() => handleRemovePhoto(index)}
            />
          );
        }

        // Порожній слот
        return <PortfolioSlot key={index} />;
      })}
    </div>
  );
}
