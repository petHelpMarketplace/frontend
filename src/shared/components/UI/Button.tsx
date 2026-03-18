import { FC, MouseEventHandler } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  label: string;
  iconPath?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  iconClass?: string;
  form?: string;
};

const Button: FC<ButtonProps> = ({
  label,
  iconPath,
  onClick,
  type = 'button',
  disabled = false,
  className,
  iconClass,
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
      {iconPath && (
        <svg className={clsx('fill-alabaster h-4 w-4', iconClass)}>
          <use href={iconPath} />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
};

export default Button;
