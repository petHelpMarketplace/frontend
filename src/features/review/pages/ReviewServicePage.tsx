import Button from '@/components/Ui/Button/Button';
import ReviewForm from '@/features/review/components/ReviewForm';
import SpecialistInfo from '@/features/review/components/SpecialistInfo';
import {
  reviewSchema,
  ReviewSchemaType,
} from '@/features/review/validation/reviewSchema';
import BackButton from '@/shared/components/UI/BackButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

const ReviewServicePage = () => {
  const methods = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <section className="xl:max-w-7xl m-auto xl:px-30 xl:pt-[69px] xl:pb-[73px]">
        <BackButton className="xl:mb-[34px]" />
        <div className="grid xl:grid-cols-[682px_304px] xl:gap-x-[54px] xl:gap-y-[30px]">
          <ReviewForm />
          <SpecialistInfo />
          <Button
            label="Відправити відгук"
            type="submit"
            className="btn-2lg"
            form="reviewForm"
          />
        </div>
      </section>
    </FormProvider>
  );
};

export default ReviewServicePage;
