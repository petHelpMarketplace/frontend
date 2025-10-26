import Button from '@/shared/components/UI/Button';
import {
  registerSchema,
  RegisterSchemaType,
} from '@/features/auth/validations/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ErrorIcon from '@/features/auth/components/ErrorIcon';
import SuccessIcon from '@/features/auth/components/SuccessIcon';
import { registerSpec } from '@/features/auth/model/operations';
import { selectAuthLoading } from '@/features/auth/model/selectors';
import type { AppDispatch } from '@/app/store';
import { toast } from 'react-hot-toast';

// Визначаємо тривалість анімації (в мс), щоб синхронізувати з CSS
const TRANSITION_DURATION = 300;

const RegisterForm = ({ onOpenLogin }: { onOpenLogin: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectAuthLoading);
  const [hasInput, setHasInput] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  // Скидання стану форми при відкритті компонента
  useEffect(() => {
    reset();
  }, [reset]);

  /*Ініціюємо плавне згасання вікна реєстрації, а потім викликаємо onOpenLogin.
   */
  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsClosing(true);

    // Встановлюємо таймаут, щоб дочекатися завершення CSS-переходу
    setTimeout(() => {
      // Після завершення анімації перемикаємо на форму логіну
      onOpenLogin();
      // Очищуємо форму реєстрації
      reset();
      // Скидаємо стан isClosing для майбутнього використання, якщо компонент не буде одразу розмонтований
      setIsClosing(false);
    }, TRANSITION_DURATION);
  };

  const onSubmit = async (data: RegisterSchemaType) => {
    const requestBody = {
      email: data.email.toLowerCase(),
      name: data.name.replace(/\s+/g, ' ').trim(),
      password: data.password,
      password_confirmation: data.password_confirmation,
      phone: '+38' + data.phone,
    };

    try {
      await dispatch(registerSpec(requestBody)).unwrap();
      toast.success('Registration successful!');
      // Якщо успішна реєстрація, робимо плавний перехід на логін
      setIsClosing(true);
      setTimeout(() => {
        onOpenLogin();
        reset();
        setIsClosing(false);
      }, 1500); // Затримка 1.5s після успіху, щоб користувач побачив тост
    } catch (error) {
      const msg = typeof error === 'string' ? error : 'Registration failed';
      toast.error(msg);
    }
  };
  const getInputClass = (error: boolean, success: boolean) => {
    if (error) return 'input-base border-red-tenn focus:border-red-tenn';
    if (success) return 'input-base border-tenn focus:border-tenn';
    return 'input-base';
  };

  return (
    <div
      className={`flex flex-col gap-4 transition-opacity xl:gap-4.5 duration-${TRANSITION_DURATION} ease-in-out ${
        isClosing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <h3 className="text-fire text-center uppercase">РЕЄСТРАЦІЯ</h3>

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
        className="flex flex-col gap-4 xl:gap-4.5"
        noValidate
      >
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ім'я"
            autoComplete="name"
            className={getInputClass(
              !!errors.name,
              !!(!errors.name && dirtyFields.name)
            )}
            {...register('name')}
          />
          {errors.name && <ErrorIcon />}
          {!errors.name && dirtyFields.name && <SuccessIcon />}
          {errors.name && (
            <p className="text-red-tenn absolute mt-0.5 pl-5 text-[8px]">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="+38 (000) 000-00-00"
                unmask={true}
                lazy={false}
                placeholder="+38 (___) ___-__-__"
                className={
                  getInputClass(
                    !!errors.phone,
                    !!(!errors.phone && dirtyFields.phone)
                  ) + (hasInput ? ' text-mineShaft' : ' text-dust-gray')
                }
                onAccept={value => {
                  setHasInput(!!value);
                  field.onChange(value); // Передаємо очищене значення
                }}
              />
            )}
          />
          {errors.phone && <ErrorIcon />}
          {!errors.phone && dirtyFields.phone && <SuccessIcon />}
          {errors.phone && (
            <p className="text-red-tenn absolute mt-0.5 pl-5 text-[8px]">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
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

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            placeholder="Пароль"
            autoComplete="new-password"
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

        {/* Confirm Password */}
        <div className="relative">
          <input
            type="password"
            placeholder="Повторити пароль"
            autoComplete="new-password"
            className={getInputClass(
              !!errors.password_confirmation,
              !!(
                !errors.password_confirmation &&
                dirtyFields.password_confirmation
              )
            )}
            {...register('password_confirmation')}
          />
          {errors.password_confirmation && <ErrorIcon />}
          {!errors.password_confirmation &&
            dirtyFields.password_confirmation && <SuccessIcon />}

          {errors.password_confirmation && (
            <p className="text-red-tenn absolute mt-0.5 pl-5 text-[8px]">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <p className="text-cod-gray text-center text-[10px] font-semibold">
          Вже маєте обліковий запис?{' '}
          <button
            type="button"
            className="text-fire"
            onClick={handleLoginClick}
            disabled={loading} // Блокуємо, якщо йде реєстрація
          >
            Увійти
          </button>
        </p>
        <Button
          label="Зареєструватися"
          type="submit"
          disabled={loading || isClosing}
        />
      </form>

      <p className="text-mineShaft text-center text-[10px]">
        Реєструючись, ви погоджуєтесь з{' '}
        <Link
          to={'/terms-and-conditions'}
          className="text-fire font-semibold underline [text-decoration-skip-ink:none]"
        >
          правилами
        </Link>{' '}
        сервісу
      </p>
    </div>
  );
};

export default RegisterForm;
