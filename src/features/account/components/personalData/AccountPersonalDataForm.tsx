// components/account-data/AccountDataForm.tsx

// import { FormProvider, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { accountSchema, AccountFormValues } from './validation/accountSchema';

import PhotoBlock from './PhotoBlock';
import DetailsBlock from './DetailsBlock';
import PersonalInfoBlock from './PersonalInfoBlock';

export default function AccountPersonalDataForm() {
  // const methods = useForm<AccountFormValues>({
  //   resolver: zodResolver(accountSchema),
  //   defaultValues: {
  //     firstName: '',
  //     lastName: '',
  //     phone: '',
  //     district: '',
  //     experience: '',
  //     about: '',
  //     photo: null,
  //   },
  // });

  // const onSubmit = (data: AccountFormValues) => {
  //   console.log('Збережені дані:', data);
  // };

  return (
    // <FormProvider {...methods}>
    //   <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-3 gap-x-10 gap-y-8">
    <>
      <div className="flex gap-13 mb-22">
        <PhotoBlock />
        <DetailsBlock />
      </div>
      <div className="xl:col-span-3">
        <PersonalInfoBlock />
      </div>
    </>
    //   </form>
    // </FormProvider>
  );
}
