import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/index'; // helpers
import {
  setEmail,
  toggleActiveStatus,
} from '@/features/account/model/settingsSlice'; // example
import TelegramConnectButton from './TelegramConnectButton';
import DeleteProfileButton from './DeleteProfileButton';
import Tippy from '@tippyjs/react';

type GeneralFormValues = {
  email: string;
};

const AccountGeneralForm = () => {
  const dispatch = useAppDispatch();
  const { email, isActive } = useAppSelector(state => state.account); // example

  const {
    register,
    handleSubmit,
    // formState: { isDirty },
  } = useForm<GeneralFormValues>({
    defaultValues: { email },
    mode: 'onChange',
  });

  const onSubmit = (data: GeneralFormValues) => {
    dispatch(setEmail(data.email));
  };

  const handleToggle = () => {
    dispatch(toggleActiveStatus());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      {/* Email input */}
      <div className="relative flex items-center">
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="input-base h-12 pl-11"
        />
        <svg
          className="absolute w-5 h-5 fill-mist-gray right-8"
          aria-label="Редагувати"
        >
          <use href="/icons.svg#icon-pencil-3" />
        </svg>
      </div>

      {/* Switch активності */}
      <div className="flex items-center gap-4 text-lg h-12">
        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            className="toggle toggle-xl sr-only"
            checked={isActive}
            onChange={handleToggle}
          />
          <span
            className={`relative flex items-center w-11.5 h-6 rounded-full px-0.5
              ${isActive ? 'justify-end bg-tenn' : 'justify-start bg-tenn/60'}
              before:content-[''] before:w-5 before:h-5 before:rounded-full before:bg-alabaster`}
          ></span>
        </label>

        <span id="tooltip" className="text-cod-gray font-semibold">
          Профіль{' '}
          {isActive ? (
            <span className="text-fire">активний</span>
          ) : (
            <Tippy
              placement="right"
              offset={[0, 14]} // Spacing between the trigger element and the tooltip
              className="w-51 h-20 py-2 px-4 rounded-2xl shadow-tooltip text-cod-gray text-xs bg-alabaster"
              content={
                // Tooltip
                <span>
                  В статусі “Профіль неактивний” замовник не зможе надсилати Вам
                  замовлення
                </span>
              }
            >
              <span className="cursor-help">неактивний</span>
            </Tippy>
          )}
        </span>
      </div>
      <TelegramConnectButton />
      <DeleteProfileButton />
    </form>
  );
};

export default AccountGeneralForm;
