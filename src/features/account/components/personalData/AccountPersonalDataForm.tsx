import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  specInfoSchema,
  SpecInfoSchemaType,
} from '@/features/account/validation/specInfoSchema';
import PhotoBlock from './PhotoBlock';
import DetailsBlock from './DetailsBlock';
import PersonalInfoBlock from './PersonalInfoBlock';
import { useAppSelector } from '@/shared/hooks';
import { selectSpecInfo } from '../../model/selectors';

export default function AccountPersonalDataForm() {
  const specialist = useAppSelector(selectSpecInfo);

  const methods = useForm<SpecInfoSchemaType>({
    resolver: zodResolver(specInfoSchema),
    mode: 'onChange',
    values: specialist
      ? {
          name: specialist.name || '',
          family_name: specialist.family_name || '',
          phone: specialist.phone || '',
          // district: specialist.district || '',
          district: '',
          experience: specialist.experience || 0,
          bio: specialist.bio || '',
          avatar: specialist.avatar_url || null,
        }
      : undefined,
  });

  const onSubmit = (data: SpecInfoSchemaType) => {
    console.log('Збережені дані:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <div className="mb-22 flex gap-13">
          <PhotoBlock />
          <DetailsBlock />
        </div>
        <div className="xl:col-span-3">
          <PersonalInfoBlock />
        </div>
      </form>
    </FormProvider>
  );
}
