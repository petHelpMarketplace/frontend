import Button from '@/shared/components/UI/Button';
import {
  registerSchema,
  RegisterSchemaType,
} from '@/features/auth/validations/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { useState } from 'react';
import ErrorIcon from '@/features/auth/components/ErrorIcon';
import SuccessIcon from '@/features/auth/components/SuccessIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [hasInput, setHasInput] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data: RegisterSchemaType) => {
    const requestBody = {
      email: data.email.toLowerCase(),
      // family_name: data.family_name?.trim() ?? '',
      name: data.name.replace(/\s+/g, ' ').trim(),
      password: data.password,
      password_confirmation: data.password_confirmation,
      phone: '38' + data.phone,
    };
    console.log('Sending data:', requestBody);

    setLoading(true);
    setMessage(null);
    setSuccess(false);
    try {
      const res = await fetch(
        'https://petbackend-a2vg.onrender.com/api/v1/specialist/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );
      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        setMessage(result.message || 'Успішно зареєстровано!');
        setTimeout(() => {
          navigate('/login');
          reset();
        }, 2000);
      } else {
        setSuccess(false);
        setMessage(result.message || 'Помилка реєстрації');
      }
    } catch (err: unknown) {
      console.error('Registration API call failed:', err);
      setSuccess(false);
      if (err instanceof Error) {
        setMessage(`Мережева помилка: ${err.message}`);
      } else {
        setMessage('Мережева помилка');
      }
    } finally {
      setLoading(false);
    }
  };
  const getInputClass = (error: boolean, success: boolean) => {
    if (error) return 'input-base border-red-tenn focus:border-red-tenn';
    if (success) return 'input-base border-tenn focus:border-tenn';
    return 'input-base';
  };

  return (
    <div className="flex flex-col gap-4 xl:gap-4.5">
      <h3 className="text-fire uppercase text-center">РЕЄСТРАЦІЯ</h3>

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
      {message && (
        <p className={`text-center ${success ? 'text-tenn' : 'text-red-tenn'}`}>
          {message}
        </p>
      )}
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
            className={getInputClass(
              !!errors.name,
              !!(!errors.name && dirtyFields.name)
            )}
            {...register('name')}
          />
          {errors.name && <ErrorIcon />}
          {!errors.name && dirtyFields.name && <SuccessIcon />}
          {errors.name && (
            <p className="absolute text-red-tenn text-[8px] pl-5 mt-0.5">
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
            <p className="absolute text-red-tenn text-[8px] pl-5 mt-0.5">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
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

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="relative">
          <input
            type="password"
            placeholder="Повторити пароль"
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
            <p className="absolute text-red-tenn text-[8px] pl-5 mt-0.5">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <p className="text-[10px] font-semibold text-center text-cod-gray">
          Вже маєте обліковий запис?{' '}
          <Link to={'/login'} className="text-fire">
            Увійти
          </Link>
        </p>
        <Button label="Зареєструватися" type="submit" disabled={loading} />
      </form>

      <p className="text-[10px] text-mineShaft text-center">
        Реєструючись, ви погоджуєтесь з{' '}
        <Link
          to={'/terms-and-conditions'}
          className="font-semibold underline [text-decoration-skip-ink:none] text-fire"
        >
          правилами
        </Link>{' '}
        сервісу
      </p>
    </div>
  );
};

export default RegisterForm;
