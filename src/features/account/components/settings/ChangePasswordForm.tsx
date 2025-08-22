import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<PasswordFormValues>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    console.log('Submitted data:', data);
    // Тут буде логіка API-запиту
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      <input
        type="password"
        placeholder="Поточний пароль"
        {...register('currentPassword')}
        className="input-base h-12 "
      />

      <input
        type="password"
        placeholder="Новий пароль"
        {...register('newPassword')}
        className="input-base h-12 "
      />

      <input
        type="password"
        placeholder="Повторити пароль"
        {...register('confirmPassword')}
        className="input-base h-12 "
      />

      <button
        type="submit"
        className={twMerge(
          'btn',
          'xl:w-2/3 flex gap-4 items-center justify-center'
        )}
        disabled={!isDirty}
      >
        Зберегти пароль
      </button>
    </form>
  );
};

export default ChangePasswordForm;
