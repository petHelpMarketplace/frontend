import Button from '@/shared/components/UI/Button';
import ErrorIcon from '@/features/auth/components/ErrorIcon';
import SuccessIcon from '@/features/auth/components/SuccessIcon';
import { useRef, useState } from 'react';
import { getInputClass } from '@/features/auth/lib/getInputClass';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { selectAuthLoading } from '@/features/auth/model/selectors';
import { useSelector } from 'react-redux';
import {
  pwdRecoverySchema,
  PwdRecoverySchemaType,
} from '@/features/auth/validations/pwdRecovery.Schema';

const PwdRecoveryForm = ({ onOpenLogin }: { onOpenLogin: () => void }) => {
  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<PwdRecoverySchemaType>({
    resolver: zodResolver(pwdRecoverySchema),
    mode: 'onChange',
  });

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsClosing(true);

    // Встановлюємо таймаут, щоб дочекатися завершення CSS-переходу
    timeoutRef.current = setTimeout(() => {
      // Після завершення анімації перемикаємо на форму логіну
      onOpenLogin();
      // Очищуємо форму реєстрації
      reset();
      // Скидаємо стан isClosing для майбутнього використання, якщо компонент не буде одразу розмонтований
      setIsClosing(false);
    }, 300);
  };

  const onSubmit = async (data: PwdRecoverySchemaType) => {
    const requestBody = {
      email: data.email.toLowerCase(),
    };

    try {
      // await dispatch(registerSpec(requestBody)).unwrap();
      console.log(requestBody);

      toast.success('Ми надіслали інструкції на Вашу електронну пошту');
      // Якщо успішний запит, робимо плавний перехід на логін
      setIsClosing(true);
      setTimeout(() => {
        onOpenLogin();
        reset();
        setIsClosing(false);
      }, 300);
    } catch (error) {
      const msg = typeof error === 'string' ? error : 'Registration failed';
      toast.error(msg);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 transition-opacity duration-300 ease-in-out xl:gap-4.5 ${
        isClosing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4.5"
        noValidate
      >
        <h3 className="text-fire text-center uppercase">ВІДНОВЛЕННЯ ПАРОЛЮ</h3>
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

        <Button label="Відновити пароль" type="submit" />

        <button
          type="button"
          className="text-fire text-[10px] font-semibold"
          onClick={handleLoginClick}
          disabled={loading || isClosing} // Блокуємо, якщо йде запит або закриття вікна
        >
          Згадали пароль?
        </button>
      </form>
    </div>
  );
};

export default PwdRecoveryForm;
