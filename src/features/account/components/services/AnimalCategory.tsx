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
    <div className="flex flex-col gap-8 py-4 w-1/2">
      <div className="flex items-center justify-center gap-5.5 text-fire text-xl font-semibold">
        <svg className="w-8 h-7 fill-fire">
          <use href={`/icons.svg#${icon}`} />
        </svg>
        <span>{type}</span>
      </div>

      <ul className="flex flex-col gap-4">
        {services.map(({ name }) => (
          <li key={name} className="flex justify-between items-center">
            <Controller
              control={control}
              name={`services.${type}.${name}`}
              render={({ field }) => (
                <label className="flex items-center gap-5.5 w-1/2">
                  <input
                    type="checkbox"
                    name={field.name}
                    ref={field.ref}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    checked={field.value}
                    aria-label={`Оберіть послугу ${name}`}
                    className="book-checkbox-btn sr-only"
                  />
                  <span className="flex items-center justify-center w-5 h-5 rounded-[4px] border-2 border-fire">
                    <svg className="w-4 h-3">
                      <use href="/icons.svg#icon-tick" />
                    </svg>
                  </span>

                  <span className="">{name}</span>
                </label>
              )}
            />
            <Controller
              control={control}
              name={`prices.${type}.${name}`} // або інша логічна структура
              render={({ field }) => (
                <input
                  type="text"
                  className="input-base h-8 w-1/2 text-center"
                  placeholder="грн/год"
                  autoComplete="off"
                  {...field}
                />
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
