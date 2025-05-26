import BackButton from '@/shared/components/UI/BackButton';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="xl:max-w-7xl m-auto xl:px-30 xl:pt-[69px] xl:pb-[51px] text-center">
      <BackButton />
      <div className="relative w-fit m-auto mb-[34px]">
        <img
          src="/public/error-404-1x.webp"
          srcSet="/public/error-404-1x.webp 1x, /public/error-404-2x.webp 2x"
          alt="Error 404 image"
          className="m-auto"
        />
        <p className="xl:text-xl font-semibold absolute bottom-0 left-1/2 -translate-x-1/2 w-full ">
          Схоже, ми не можемо знайти сторінку, яку Ви шукаєте
        </p>
      </div>

      {/* <Button label="На головну сторінку" type="button" /> */}
      <Link to={'/'} className="btn btn-2lg inline-block p-5">
        На головну сторінку
      </Link>
    </section>
  );
};

export default NotFoundPage;
