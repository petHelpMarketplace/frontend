import BackButton from '@/shared/components/UI/BackButton';
import ContactUs from '../components/ContactUs';
import ContactForm from '../components/ContactForm';

const SupportPage = () => {
  return (
    <section>
      <div className="section-wrap">
        <BackButton className="mb-6 xl:mb-9" />
        <div className="flex flex-col gap-8 xl:flex-row xl:gap-13.5">
          <ContactUs />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
