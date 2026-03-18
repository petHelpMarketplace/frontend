import BackButton from '@/shared/components/UI/BackButton';
import ContactUs from '../components/ContactUs';

const ContactUsPage = () => {
  return (
    <section>
      <div className="section-wrap">
        <BackButton className="mb-6 xl:mb-9" />
        <ContactUs />
      </div>
    </section>
  );
};

export default ContactUsPage;
