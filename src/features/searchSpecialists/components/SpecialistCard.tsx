import { Specialist } from '@/features/searchSpecialists/types/specialist';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Ui/Button/Button';
import { useState } from 'react';

type Props = {
  specialist: Specialist;
};

const SpecialistCard = ({ specialist }: Props) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    family_name,
    experience,
    is_verified,
    image_id,
    avatar,
    bio,
  } = specialist;
  const [hasImageError, setHasImageError] = useState(false);
  const imageBase = image_id?.[0]?.trim();
  const hasImageBase = imageBase && imageBase.length > 0;
  const imageSrc = avatar?.trim()
    ? avatar
    : hasImageBase
      ? `/imagesSpecialists/${imageBase}-1x.webp`
      : '/placeholder.webp';

  const renderExperience = () => {
    if (experience === 0) return 'Менше року';
    if (experience === 1) return '1 рік';
    if (experience > 1 && experience < 5) return `${experience} роки`;
    return `${experience} років`;
  };

  const shortFamilyName = family_name ? `${family_name[0]}.` : '';

  return (
    <div className="w-[500px] h-[400px] bg-alabaster rounded-[16px] shadow-[0_1px_4px_4px_rgba(0,0,0,0.25)] p-5 gap-6 flex">
      {/* Зображення */}
      <div className="w-[236px] h-[360px] flex-shrink-0 rounded-[16px] overflow-hidden">
        <picture>
          {!hasImageError && hasImageBase && (
            <source
              srcSet={`/imagesSpecialists/${imageBase}-2x.webp 2x, /imagesSpecialists/${imageBase}-1x.webp 1x`}
              type="image/webp"
            />
          )}
          <img
            src={imageSrc}
            alt={`${name} ${family_name}`}
            className="w-full h-full object-cover"
            onError={e => {
              setHasImageError(true);
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder.webp';
            }}
            loading="lazy"
          />
        </picture>
      </div>

      {/* Контент */}
      <div className="flex flex-col h-[360px] flex-grow">
        <div
          className={`flex flex-col flex-grow min-h-0 overflow-hidden ${
            !is_verified ? 'gap-6' : 'gap-4'
          }`}
        >
          <h2 className="text-xl font-semibold text-fire">
            {name} {shortFamilyName}
          </h2>

          {is_verified && (
            <div className="flex items-center gap-[7px]">
              <svg
                className="w-[17px] h-[17px] fill-fire"
                aria-label="Перевірений фахівець"
                role="img"
              >
                <use href="/icons.svg#icon-verified" />
              </svg>
              <span className="text-sm font-normal text-cod-gray">
                Перевірений фахівець
              </span>
            </div>
          )}

          <p className="text-sm text-cod-gray">
            <strong className="font-semibold">Досвід:</strong>{' '}
            <span className="font-normal">{renderExperience()}</span>
          </p>

          <p className="text-sm text-cod-gray text-justify line-clamp-9">
            <strong className="font-semibold">Про себе:</strong>{' '}
            {bio || 'Опис відсутній'}
          </p>
        </div>

        <Button
          label="Відкрити профіль"
          type="button"
          onClick={() => navigate(`/specialists/${id}`)}
          className="mt-auto max-w-[200px] h-[40px] text-base font-normal text-alabaster text-center rounded-xl bg-tenn hover:shadow-shark active:shadow-inset-shark"
          aria-label={`Відкрити профіль ${name} ${family_name}`}
        />
      </div>
    </div>
  );
};

export default SpecialistCard;
