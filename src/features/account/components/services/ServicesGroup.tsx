import { AnimalCategory } from './AnimalCategory';
import {
  AnimalCategoryData,
  AccountServicesFormValues,
} from '@/features/account/types';
import { Control } from 'react-hook-form';

type ServicesGroupProps = {
  categories: AnimalCategoryData[];
  control: Control<AccountServicesFormValues>;
};

export function ServicesGroup({ categories, control }: ServicesGroupProps) {
  return (
    <div className="flex flex-col gap-8 border-2 border-fire rounded-2xl p-6">
      {categories.map(({ type, icon, services }) => (
        <AnimalCategory
          key={type}
          type={type}
          icon={icon}
          services={services}
          control={control}
        />
      ))}
    </div>
  );
}
