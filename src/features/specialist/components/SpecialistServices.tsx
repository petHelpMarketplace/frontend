// components/ServicesModal.tsx
import { Service } from '../types';
import { SpecialistMock, AnimalService } from '../types';

type Props = {
  services: Service[];
  onClose: () => void;
  profile: SpecialistMock;
};

const SpecialistServices = ({ profile, services }: Props) => {
  const { iconDog, iconCat } = profile;
  const dogServices = services.filter(
    (s): s is AnimalService => s.type === 'dog'
  );
  const catServices = services.filter(
    (s): s is AnimalService => s.type === 'cat'
  );

  return (
    <>
      <div className="flex justify-between gap-12 h-auto">
        {/* Собаки */}
        <div className="flex flex-col justify-between min-w-[254px]">
          <div className="flex items-center gap-5 justify-center mb-4">
            <svg
              className="fill-fire"
              width="30"
              height="30"
              aria-hidden="true"
            >
              <use href={`/icons.svg#${iconDog}`} />
            </svg>
            <h2 className="text-xl font-semibold flex items-center gap-2 text-fire">
              Собаки
            </h2>
          </div>
          <ul className="flex flex-col gap-2">
            {dogServices.map((service, index) => (
              <li key={index} className="flex">
                <span className="mr-8 min-w-[120px]">{service.title}</span>
                <span className="mr-2">{service.price}</span>
                <span>{service.duration}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Коти */}
        <div>
          <div className="flex items-center gap-5 justify-center mb-4">
            <svg
              className="fill-fire"
              width="30"
              height="30"
              aria-hidden="true"
            >
              <use href={`/icons.svg#${iconCat}`} />
            </svg>
            <h2 className="text-xl font-semibold flex items-center gap-2 text-fire">
              Коти
            </h2>
          </div>
          <ul className="space-y-1">
            {catServices.map((service, index) => (
              <li key={index} className="flex">
                <span className="mr-8 min-w-[120px]">{service.title}</span>
                <span className="mr-2">{service.price}</span>
                <span>{service.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SpecialistServices;
