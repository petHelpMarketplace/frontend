import BackButton from '@/shared/components/UI/BackButton';
import { Link } from 'react-router-dom';

type Props = {
  /** Показувати вбудовану кнопку "Назад" у цьому компоненті */
  showBackButton?: boolean;
  /** Текст заголовка/опису під зображенням */
  message?: string;
  /** URL для primary-кнопки (наприклад, "На головну") */
  primaryTo?: string;
  /** Текст для primary-кнопки */
  primaryText?: string;
  /** Додаткові класи обгортки */
  className?: string;
};

const NotFoundPage = ({
  showBackButton = true,
  message = 'Схоже, ми не можемо знайти сторінку, яку Ви шукаєте',
  primaryTo = '/',
  primaryText = 'На головну сторінку',
  className = '',
}: Props) => {
  return (
    <section className={`m-auto text-center xl:max-w-7xl xl:px-30 xl:pt-[69px] xl:pb-[51px] ${className}`}>
     {showBackButton && <BackButton />}
      <div className="relative m-auto mb-[34px] w-fit">
        <img
          width="602"
          height="409"
          src="/error-404-1x.webp"
          srcSet="/error-404-1x.webp 1x, /error-404-2x.webp 2x"
          alt="Error 404 image"
          className="m-auto"
        />
        <p className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 font-semibold xl:text-xl">
          {message}
        </p>
      </div>

      { primaryTo && (<Link to={primaryTo} className="btn btn-2lg inline-block p-5">
        {primaryText}
      </Link>)}
    </section>
  );
};

export default NotFoundPage;
