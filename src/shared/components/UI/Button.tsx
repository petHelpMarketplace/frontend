import { FC, MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  form?: string;
};

const Button: FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className,
  form,
}) => {
  const buttonClass = clsx(
    'btn', // General styles for all buttons
    {
      'btn-disabled': disabled,
    },
    className
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
      form={form}
    >
      {icon && (
        <span className="absolute left-[16px] flex items-center">{icon}</span>
      )}
      <span>{label}</span>
    </button>
  );
};

export default Button;
