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
import { loginSpec } from '@/features/auth/model/operations';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import toast from 'react-hot-toast';
import { LoginFormProps } from '@/features/auth/types/types';
import { useEffect, useRef, useState } from 'react';
import { getInputClass } from '@/features/auth/lib/getInputClass';
import { selectAuthLoading } from '@/features/auth/model/selectors';

const LoginForm = ({ onClose, onOpenPwdRecovery }: LoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await dispatch(loginSpec(data)).unwrap();
      // toast.success('Login successful!');
      reset();
      onClose();
    } catch (e) {
      const error =
        typeof e === 'string' ? e : 'Login failed. Please try again.';
      toast.error(error);
    }
  };

  const handlePwdResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsClosing(true);

    // Встановлюємо таймаут, щоб дочекатися завершення CSS-переходу
    timeoutRef.current = setTimeout(() => {
      // Після завершення анімації перемикаємо на форму логіну
      onOpenPwdRecovery();
      // Очищуємо форму реєстрації
      reset();
      // Скидаємо стан isClosing для майбутнього використання, якщо компонент не буде одразу розмонтований
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`flex flex-col gap-4 transition-opacity duration-300 ease-in-out xl:gap-4.5 ${
        isClosing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <h3 className="text-fire text-center uppercase">УВІЙТИ</h3>

      <Button
        label="Увійти з Google"
        type="button"
        disabled
        className="btn-icon btn-google-disabled"
        icon={
          <svg className="h-7 w-7">
            <use href="/icons.svg#icon-google" />
          </svg>
        }
      />

      <p className="text-mineShaft text-center text-[11px]">
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
            autoComplete="email"
            className={getInputClass(
              !!errors.email,
              !!(!errors.email && dirtyFields.email)
            )}
            {...register('email')}
          />
          {errors.email && <ErrorIcon />}
          {!errors.email && dirtyFields.email && <SuccessIcon />}
          {errors.email && (
            <p className="text-red-tenn absolute mt-0.5 pl-5 text-[8px]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            className={getInputClass(
              !!errors.password,
              !!(!errors.password && dirtyFields.password)
            )}
            {...register('password')}
          />
          {errors.password && <ErrorIcon />}
          {!errors.password && dirtyFields.password && <SuccessIcon />}
          {errors.password && (
            <p className="text-red-tenn absolute mt-0.5 pl-5 text-[8px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="button"
          className="text-fire text-[10px] font-semibold"
          onClick={handlePwdResetClick}
          disabled={loading || isClosing} // Блокуємо, якщо йде логін або закриття вікна
        >
          Забули пароль?
        </button>

        <Button label="Увійти" type="submit" />
      </form>

      <p className="text-mineShaft text-center text-[10px]">
        Увійшовши, ви погоджуєтесь з{' '}
        <Link
          to={'#'}
          className="text-fire font-semibold lowercase underline [text-decoration-skip-ink:none]"
        >
          правилами
        </Link>{' '}
        сервісу
      </p>
    </div>
  );
};

export default LoginForm;
