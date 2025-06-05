import Button from '@/shared/components/UI/Button';
import {
  registerSchema,
  RegisterSchemaType,
} from '@/features/auth/validations/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { useState } from 'react';
import ErrorIcon from '@/features/auth/components/ErrorIcon';
import SuccessIcon from '@/features/auth/components/SuccessIcon';

const RegisterForm = () => {
  const [hasInput, setHasInput] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterSchemaType) => {
    const finalData = {
      ...data,
      phone: '38' + data.phone, // Add the prefix +38
      email: data.email.toLowerCase(),
      fullName: data.name.replace(/\s+/g, ' ').trim(),
    };
    console.log('Sending data:', finalData);
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
              !!errors.confirmPassword,
              !!(!errors.confirmPassword && dirtyFields.confirmPassword)
            )}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <ErrorIcon />}
          {!errors.confirmPassword && dirtyFields.confirmPassword && (
            <SuccessIcon />
          )}

          {errors.confirmPassword && (
            <p className="absolute text-red-tenn text-[8px] pl-5 mt-0.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <p className="text-[10px] font-semibold text-center text-cod-gray">
          Вже маєте обліковий запис?{' '}
          <Link to={'#'} className="text-fire">
            Увійти
          </Link>
        </p>
        <Button label="Зареєструватися" type="submit" />
      </form>

      <p className="text-[10px] text-mineShaft text-center">
        Реєструючись, ви погоджуєтесь з{' '}
        <Link
          to={'#'}
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
