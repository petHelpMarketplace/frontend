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
      <label htmlFor="currentPassword" className="sr-only">
        Поточний пароль
      </label>
      <input
        id="currentPassword"
        type="password"
        placeholder="Поточний пароль"
        autoComplete="current-password"
        {...register('currentPassword')}
        className="input-base h-12 pl-11"
      />

      <label htmlFor="newPassword" className="sr-only">
        Новий пароль
      </label>
      <input
        id="newPassword"
        type="password"
        placeholder="Новий пароль"
        {...register('newPassword')}
        className="input-base h-12 pl-11"
      />

      <label htmlFor="confirmPassword" className="sr-only">
        Повторити пароль
      </label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Повторити пароль"
        {...register('confirmPassword')}
        className="input-base h-12 pl-11"
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
