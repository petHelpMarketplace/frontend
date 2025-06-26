import clsx from 'clsx';

type UserActionsProps = {
  onLogin: () => void;
  onRegister: () => void;
  className?: string; // для Tailwind-класів
};

export const UserActions = ({
  onLogin,
  onRegister,
  className = '',
}: UserActionsProps) => (
  <div className={className}>
    {[
      { label: 'Увійти як фахівець', onClick: onLogin },
      { label: 'Стати фахівцем', onClick: onRegister },
    ].map(({ label, onClick }) => (
      <button
        key={label}
        className={clsx(
          'flex items-center justify-between w-full text-xl leading-[122%] text-fire uppercase font-semibold px-2 py-[3px] border border-transparent rounded-full group hover:border-fire transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fire focus-visible:ring-offset-2 xl:normal-case xl:text-base xl:font-normal xl:w-auto'
        )}
        type="button"
        onClick={onClick}
      >
        <span>{label}</span>

        <svg
          className={clsx(
            'inline-block w-4 h-4 xl:hidden fill-fire flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1'
          )}
        >
          <use href="/icons.svg#icon-arrow-right-dashed-dashed" />
        </svg>
      </button>
    ))}
  </div>
);
