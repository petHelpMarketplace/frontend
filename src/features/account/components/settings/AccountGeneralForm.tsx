import { useForm } from 'react-hook-form';
import {
  useAppDispatch,
  useAppSelector,
} from '@/features/account/model/settingsHooks'; // твої хелпери
import {
  setEmail,
  toggleActiveStatus,
} from '@/features/account/model/settingsSlice'; // приклад
import TelegramConnectButton from './TelegramConnectButton';
import DeleteProfileButton from './DeleteProfileButton';

type GeneralFormValues = {
  email: string;
};

const AccountGeneralForm = () => {
  const dispatch = useAppDispatch();
  const { email, isActive } = useAppSelector(state => state.account); // приклад

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
      className="flex flex-col gap-5 w-full"
    >
      {/* Email input */}
      <div className="relative flex items-center">
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="input-base h-12"
        />
        {/* Іконка олівця */}
        <svg
          className="absolute w-5 h-5 fill-mist-gray right-6"
          aria-label="Редагувати"
        >
          <use href="/icons.svg#icon-pencil-2" />
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
        <span className="font-semibold">
          Профіль{' '}
          {!isActive ? (
            'неактивний'
          ) : (
            <span className="text-fire">активний</span>
          )}
        </span>
      </div>
      <TelegramConnectButton />
      <DeleteProfileButton />
    </form>
  );
};

export default AccountGeneralForm;
