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
    <div className="flex gap-19 border-2 border-fire rounded-2xl px-13 py-12">
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
