import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  specInfoSchema,
  SpecInfoSchemaType,
} from '@/features/account/validation/specInfoSchema';
import PhotoBlock from './PhotoBlock';
import DetailsBlock from './DetailsBlock';
import PersonalInfoBlock from './PersonalInfoBlock';

export default function AccountPersonalDataForm() {
  const methods = useForm<SpecInfoSchemaType>({
    resolver: zodResolver(specInfoSchema),
    mode: 'onChange',
    defaultValues: {
      // firstName: '',
      // lastName: '',
      // phone: '',
      // district: '',
      // experience: 0,
      // bio: '',
      avatar: null,
    },
  });

  const onSubmit = (data: SpecInfoSchemaType) => {
    console.log('Збережені дані:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
