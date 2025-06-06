import Button from '@/shared/components/UI/Button';
import {
  loginSchema,
  LoginSchemaType,
} from '@/features/auth/validations/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SuccessIcon from '@/features/auth/components/SuccessIcon';
import ErrorIcon from '@/features/auth/components/ErrorIcon';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log('Form data:', data);
  };

  const getInputClass = (error: boolean, success: boolean) => {
    if (error) return 'input-base border-red-tenn focus:border-red-tenn';
    if (success) return 'input-base border-tenn focus:border-tenn';
    return 'input-base';
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-fire uppercase text-center">УВІЙТИ</h3>

      <Button
        label="Увійти з Google"
        type="submit"
        disabled
        className="btn-icon btn-google-disabled"
        icon={
          <svg className="w-7 h-7">
            <use href="/icons.svg#icon-google" />
          </svg>
        }
      />

      <p className="text-[11px] text-mineShaft text-center">
        або заповніть форму
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4.5"
        noValidate
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Email"
            className={getInputClass(
              !!errors.email,
              !!(!errors.email && dirtyFields.email)
            )}
            {...register('email')}
          />
          {errors.email && <ErrorIcon />}
          {!errors.email && dirtyFields.email && <SuccessIcon />}
          {errors.email && (
            <p className="absolute text-red-tenn text-[8px] pl-5 mt-0.5">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="Пароль"
            className={getInputClass(
              !!errors.password,
              !!(!errors.password && dirtyFields.password)
            )}
            {...register('password')}
          />
          {errors.password && <ErrorIcon />}
          {!errors.password && dirtyFields.password && <SuccessIcon />}
          {errors.password && (
            <p className="absolute text-red-tenn text-[8px] pl-5 mt-0.5">
              {errors.password.message}
            </p>
          )}
        </div>
        <Link
          to={'#'}
          className="text-[10px] text-fire font-semibold text-center"
        >
          Забули пароль?
        </Link>

        <Button label="Увійти" type="submit" />
      </form>

      <p className="text-[10px] text-mineShaft text-center">
        Увійшовши, ви погоджуєтесь з{' '}
        <Link
          to={'#'}
          className="font-semibold lowercase underline [text-decoration-skip-ink:none] text-fire"
        >
          правилами
        </Link>{' '}
        сервісу
      </p>
    </div>
  );
};

export default LoginForm;
