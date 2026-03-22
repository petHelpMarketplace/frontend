import Button from '@/shared/components/UI/Button';

const ContactForm = () => {
  return (
    <form
      className="shadow-faq flex flex-col items-center gap-5 rounded-2xl px-4 py-8 xl:flex-1 xl:p-8"
      title="Ми вже готуємо це для Вас"
      noValidate
    >
      <p className="text-fire self-start leading-[169%] font-semibold">
        Напишіть нам прямо зараз
      </p>

      <label className="sr-only" htmlFor="name">
        Ім’я
      </label>
      <input
        disabled
        id="name"
        name="name"
        type="text"
        className="input-base h-12"
        placeholder="Ім’я"
        autoComplete="name"
      />

      <label className="sr-only" htmlFor="email">
        Email
      </label>
      <input
        disabled
        id="email"
        name="email"
        type="email"
        className="input-base h-12"
        placeholder="Email"
        autoComplete="email"
      />

      <label
        htmlFor="message"
        className="text-fire self-start leading-[169%] font-semibold"
      >
        Повідомлення
      </label>
      <textarea
        disabled
        name="message"
        id="message"
        placeholder="Напишіть, чим ми можемо Вам допомогти?"
        className="input-base h-[116px] resize-none p-3 xl:px-5 xl:py-3"
      />

      <Button
        label="Відправити"
        type="submit"
        disabled
        className="w-[200px] xl:w-[304px]"
      />
    </form>
  );
};

export default ContactForm;
