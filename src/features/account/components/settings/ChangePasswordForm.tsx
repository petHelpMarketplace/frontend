import { useForm } from 'react-hook-form';

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
      className="flex flex-col gap-5 w-full"
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
        className="btn bg-tenn text-alabaster rounded-2xl h-12 mt-2 w-2/3"
        disabled={!isDirty}
      >
        Зберегти пароль
      </button>
    </form>
  );
};

export default ChangePasswordForm;
