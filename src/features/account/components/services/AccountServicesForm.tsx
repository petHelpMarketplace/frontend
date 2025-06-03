import { useForm } from 'react-hook-form';
import { categoriesFromAnimals } from '@/shared/utils/categoriesFromAnimals';
// import { AnimalCategoryData } from '@/features/account/types';
import { ServicesGroup } from './ServicesGroup';
import type { AccountServicesFormValues } from '@/features/account/types';

function AccountServicesForm() {
  const { control, handleSubmit } = useForm<AccountServicesFormValues>({
    defaultValues: {
      services: categoriesFromAnimals.reduce((acc, { type, services }) => {
        acc[type] = services.reduce((sAcc, { name }) => {
          sAcc[name] = false;
          return sAcc;
        }, {} as Record<string, boolean>);
        return acc;
      }, {} as AccountServicesFormValues['services']),
    },
  });

  const onSubmit = (data: AccountServicesFormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ServicesGroup categories={categoriesFromAnimals} control={control} />
    </form>
  );
}

export default AccountServicesForm;
