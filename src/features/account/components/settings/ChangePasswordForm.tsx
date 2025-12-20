import { useForm } from 'react-hook-form';
import {
  changePwdSchema,
  ChangePwdSchemaType,
} from '../../validation/changePwdSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/shared/hooks';
import { selectSpecInfo } from '../../model/selectors';
import Button from '@/shared/components/UI/Button';

const ChangePasswordForm = () => {
  const { email } = useAppSelector(selectSpecInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ChangePwdSchemaType>({
    resolver: zodResolver(changePwdSchema(email)),
    mode: 'onChange',
    defaultValues: {
      current_password: '',
      new_password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = async (data: ChangePwdSchemaType) => {
    const payload = {
      current_password: data.current_password,
      new_password: data.new_password,
    };
    console.log('Sending to API:', payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <div>
        <label htmlFor="currentPassword" className="sr-only">
          Поточний пароль
        </label>
        <input
          id="currentPassword"
          type="password"
          placeholder="Поточний пароль"
          autoComplete="current-password"
          {...register('current_password')}
          className="input-base h-12 pl-11"
        />
        {errors.current_password?.message && (
          <p className="text-red-tenn absolute mt-1 pl-6.5 text-[8px] xl:pl-12 xl:text-[10px]">
            {String(errors.current_password.message)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="sr-only">
          Новий пароль
        </label>
        <input
          id="newPassword"
          type="password"
          placeholder="Новий пароль"
          {...register('new_password')}
          className="input-base h-12 pl-11"
        />
        {errors.new_password?.message && (
          <p className="text-red-tenn absolute mt-1 pl-6.5 text-[8px] xl:pl-12 xl:text-[10px]">
            {String(errors.new_password.message)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="sr-only">
          Повторити пароль
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Повторити пароль"
          {...register('password_confirmation')}
          className="input-base h-12 pl-11"
        />
        {errors.password_confirmation?.message && (
          <p className="text-red-tenn absolute mt-1 pl-6.5 text-[8px] xl:pl-12 xl:text-[10px]">
            {String(errors.password_confirmation.message)}
          </p>
        )}
      </div>

      <Button
        type="submit"
        label="Зберегти пароль"
        disabled={!isDirty || isSubmitting}
        className="flex items-center justify-center gap-4 xl:w-2/3"
      />
    </form>
  );
};

export default ChangePasswordForm;
