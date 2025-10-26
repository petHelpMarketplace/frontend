import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  accountInfoSchema,
  AccountInfoSchemaType,
} from '@/features/account/validation/accountSchema.ts';
import PhotoBlock from './PhotoBlock';
import DetailsBlock from './DetailsBlock';
import PersonalInfoBlock from './PersonalInfoBlock';

export default function AccountPersonalDataForm() {
  const methods = useForm<AccountInfoSchemaType>({
    resolver: zodResolver(accountInfoSchema),
    mode: 'onChange',
    // defaultValues: {
    //   firstName: '',
    //   lastName: '',
    //   phone: '',
    //   district: '',
    //   experience: '',
    //   about: '',
    //   photo: null,
    // },
  });

  const onSubmit = (data: AccountInfoSchemaType) => {
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
