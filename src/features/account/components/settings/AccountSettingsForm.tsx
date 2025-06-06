import ChangePasswordForm from './ChangePasswordForm';
import AccountGeneralForm from './AccountGeneralForm';

const AccountSettingsForm = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-23 w-full">
      {/* Ліва колонка — зміна паролю */}
      <div className="flex flex-col gap-5">
        <ChangePasswordForm />
      </div>

      {/* Права колонка — email, toggle, телеграм, видалення */}
      <div className="flex flex-col gap-5">
        <AccountGeneralForm />
      </div>
    </div>
  );
};

export default AccountSettingsForm;
