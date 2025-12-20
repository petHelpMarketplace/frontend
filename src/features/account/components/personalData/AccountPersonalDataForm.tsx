import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  specInfoSchema,
  SpecInfoSchemaType,
} from '@/features/account/validation/specInfoSchema';
import PhotoBlock from './PhotoBlock';
import DetailsBlock from './DetailsBlock';
import PersonalInfoBlock from './PersonalInfoBlock';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { selectSpecInfo } from '../../model/selectors';
import { patchSpecProfile } from '../../model/operations';
import toast from 'react-hot-toast';

export default function AccountPersonalDataForm() {
  const specialist = useAppSelector(selectSpecInfo);
  const dispatch = useAppDispatch();

  const methods = useForm<SpecInfoSchemaType>({
    resolver: zodResolver(specInfoSchema),
    mode: 'onChange',
    values: specialist
      ? {
          name: specialist.name || '',
          family_name: specialist.family_name || '',
          phone: specialist.phone ? specialist.phone.replace('+38', '') : '',
          // district: specialist.district || '',
          district: '',
          experience: specialist.experience || 0,
          bio: specialist.bio || '',
          avatar: specialist.avatar_url || null,
        }
      : undefined,
  });

  const onSubmit = async (data: SpecInfoSchemaType) => {
    const requestBody = {
      bio: data.bio.replace(/\s+/g, ' ').trim(),
      name: data.name.replace(/\s+/g, ' ').trim(),
      family_name: data.family_name
        ? data.family_name.replace(/\s+/g, ' ').trim()
        : '',
      phone: '+38' + data.phone,
      experience_years: data.experience,
    };

    // console.log(requestBody);

    try {
      await dispatch(patchSpecProfile(requestBody)).unwrap();
      toast.success('Ваш профіль успішно оновлено!');
    } catch (error) {
      const msg =
        typeof error === 'string'
          ? error
          : 'Не вдалося оновити профіль. Спробуйте ще раз пізніше.';
      toast.error(msg);
    }
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
