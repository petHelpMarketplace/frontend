import { Controller, Control } from 'react-hook-form';
import { Service, AccountServicesFormValues } from '@/features/account/types';

type AnimalCategoryProps = {
  type: 'Собаки' | 'Коти';
  icon: string;
  services: Service[];
  control: Control<AccountServicesFormValues>;
};

export function AnimalCategory({
  type,
  icon,
  services,
  control,
}: AnimalCategoryProps) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex items-center gap-2 text-fire text-xl font-semibold">
        <svg className="w-6 h-6 fill-current">
          <use xlinkHref={`#${icon}`} />
        </svg>
        <span>{type}</span>
      </div>

      <ul className="flex flex-col gap-4">
        {services.map(({ name, price }) => (
          <li
            key={name}
            className="flex justify-between items-center border-b border-gray--4 pb-2"
          >
            <Controller
              control={control}
              name={`services.${type}.${name}`}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-base text-black">
                  <input
                    type="checkbox"
                    name={field.name}
                    ref={field.ref}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    checked={field.value}
                    className="accent-fire w-4 h-4"
                  />

                  <span>{name}</span>
                </label>
              )}
            />
            <span className="text-right text-gray--2 w-24">
              {price} грн/год
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
