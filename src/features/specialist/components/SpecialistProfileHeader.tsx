import { SpecialistMock, AnimalService } from '../types';
import Button from '@/shared/components/UI/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/shared/components/UI/Modal';
import SpecialistServices from './SpecialistServices';

interface Props {
  profile: SpecialistMock;
}

export const SpecialistProfileHeader = ({ profile }: Props) => {
  const {
    avatar,
    name,
    isVerified,
    icon,
    joinDate,
    experience,
    bio,
    services,
    iconDog,
    iconCat,
    id,
  } = profile;

  const [openSpecialistServices, setOpenSpecialistServices] = useState(false);

  // Типізовані фільтри — тільки AnimalService
  const filterServicesByType = (type: 'dog' | 'cat') =>
    services.filter((s): s is AnimalService => s.type === type);

  const shortDogAnimalServices = filterServicesByType('dog').slice(0, 2);
  const shortCatAnimalServices = filterServicesByType('cat').slice(0, 2);

  const navigate = useNavigate();

  return (
    <section className="flex xl:flex-row gap-[26px] text-shark mb-[70px]">
      {/* Ліва частина */}
      <div className="flex-1 flex xl:flex-row gap-[35px] p-5 shadow-smoke rounded-2xl bg-alabaster">
        <img
          src={avatar}
          alt={name}
          className="w-[236px] h-auto rounded-2xl object-cover"
        />
        <div>
          <h2 className="text-fire text-xl font-semibold flex items-center gap-3 mb-5">
            {name}
            {isVerified && (
              <span className="fill-fire" title="Перевірений">
                <svg width="20" height="20" aria-hidden="true">
                  <use href={`/icons.svg#${icon}`} />
                </svg>
              </span>
            )}
          </h2>
          <p className="mb-5">На сайті з: {joinDate}</p>
          <p className="mb-8">
            <span className="font-semibold">Досвід:</span> {experience}
          </p>
          <p className="text-justify">
            <span className="font-semibold">Про себе:</span>
            {bio}
          </p>
        </div>
      </div>

      {/* Права частина */}
      <div className="flex xl:flex-col justify-between w-full max-w-[304px]">
        <div className="flex flex-col justify-center rounded-[16px] px-[25px] pt-5 pb-[14px] shadow-smoke bg-alabaster">
          {/* Собаки */}
          <div className="flex justify-center items-center gap-5 mb-[16px]">
            <svg
              className="fill-tenn"
              width="30"
              height="30"
              aria-hidden="true"
            >
              <use href={`/icons.svg#${iconDog}`} />
            </svg>
            <h3 className="text-fire text-xl font-semibold">Собаки</h3>
          </div>
          <ul className="flex flex-col gap-[13px] mb-[28px]">
            {shortDogAnimalServices.map(service => (
              <li key={service.id} className="flex gap-7 min-w-30">
                <span>{service.title}:</span>
                <span>
                  {service.price} {service.duration}
                </span>
              </li>
            ))}
          </ul>

          {/* Коти */}
          <div className="flex justify-center items-center gap-5 mb-[16px]">
            <svg
              className="fill-tenn"
              width="30"
              height="30"
              aria-hidden="true"
            >
              <use href={`/icons.svg#${iconCat}`} />
            </svg>
            <h3 className="text-tenn text-xl font-semibold">Коти</h3>
          </div>
          <ul className="flex flex-col gap-[13px] mb-[28px]">
            {shortCatAnimalServices.map(service => (
              <li key={service.id} className="flex gap-7 min-w-30">
                <span>{service.title}:</span>
                <span>
                  {service.price} {service.duration}
                </span>
              </li>
            ))}
          </ul>

          {/* Кнопка відкриття модалки */}
          {(services.filter(s => s.type === 'dog').length > 2 ||
            services.filter(s => s.type === 'cat').length > 2) && (
            <button
              type="button"
              onClick={() => setOpenSpecialistServices(true)}
              className="bg-transparent text-tenn text-sm h-auto font-semibold hover:underline transition duration-200 ease-in-out"
            >
              Всі послуги
            </button>
          )}

          {/* Модалка */}
          <Modal
            isOpen={openSpecialistServices}
            onClose={() => setOpenSpecialistServices(false)}
            className="xl:w-[800px] h-auto shadow-smoke xl:p-14"
          >
            <SpecialistServices
              profile={profile}
              services={services}
              onClose={() => setOpenSpecialistServices(false)}
            />
          </Modal>
        </div>

        <Button
          label="Запропонувати роботу"
          type="button"
          onClick={() => {
            navigate(`/specialists/${id}/booking`);
          }}
          className="text-xl py-4 rounded-[16px] h-[68px]"
        />
      </div>
    </section>
  );
};
