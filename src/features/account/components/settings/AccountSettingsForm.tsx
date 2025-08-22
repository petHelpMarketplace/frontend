import ChangePasswordForm from './ChangePasswordForm';
import AccountGeneralForm from './AccountGeneralForm';

const AccountSettingsForm = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-23 w-full">
      {/* Ліва колонка — зміна паролю */}
      <ChangePasswordForm />

      {/* Права колонка — email, toggle, телеграм, видалення */}
      <AccountGeneralForm />
    </div>
  );
};

export default AccountSettingsForm;
