import BackButton from '@/shared/components/UI/BackButton';
import PrivacyAccordion from '../components/PrivacyAccordion';

const PrivacyPolicyPage = () => {
  return (
    <section>
      <div className="section-wrap">
        <BackButton className="mb-6 xl:mb-8.5" />
        <h1 className="text-fire mb-5 text-lg/[150%] font-semibold xl:text-xl/[135%]">
          Правила конфіденційності
        </h1>
        <PrivacyAccordion />
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
