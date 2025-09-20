import BackButton from '@/shared/components/UI/BackButton';
import PublicOfferParticle from '../components/PublicOfferParticle';

const PublicOfferPage = () => {
  return (
    <section>
      <div className="section-wrap">
        <BackButton className="mb-9" />
        <h1 className="text-fire font-semibold text-xl/[135%] xl:text-2xl/[135%] mb-5">
          Публічна оферта договору про надання послуг
        </h1>
        <PublicOfferParticle />
      </div>
    </section>
  );
};

export default PublicOfferPage;
