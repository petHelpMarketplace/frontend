import Button from '@/shared/components/UI/Button';

const ContactForm = () => {
  return (
    <form className="shadow-faq flex flex-col items-center gap-5 rounded-2xl px-4 py-8 xl:flex-1 xl:p-8">
      <p className="text-fire self-start leading-[169%] font-semibold">
        Напишіть нам прямо зараз
      </p>
      <input type="text" className="input-base h-12" placeholder="Ім’я" />
      <input type="email" className="input-base h-12" placeholder="Email" />

      <p className="text-fire self-start leading-[169%] font-semibold">
        Повідомлення
      </p>
      <textarea
        name=""
        id=""
        placeholder="Напишіть, чим ми можемо Вам допомогти?"
        className="input-base h-[116px] resize-none p-3 xl:px-5 xl:py-3"
      ></textarea>

      <Button
        label="Відправити"
        type="submit"
        disabled
        className="w-[200px] xl:w-[304px]"
        resize-none
      />
    </form>
  );
};

export default ContactForm;
