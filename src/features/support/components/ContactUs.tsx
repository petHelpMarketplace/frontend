const ContactUs = () => {
  return (
    <div className="flex flex-col items-center gap-7.5 xl:flex-1 xl:items-start">
      <div className="flex flex-col gap-4 xl:gap-7.5">
        <h1 className="text-fire text-xl font-semibold">
          Як з нами зв'язатися?
        </h1>
        <div className="flex flex-col gap-3.5 xl:gap-5">
          <h2 className="font-semibold">Електронна пошта служби підтримки</h2>
          <p>
            Якщо вам потрібна допомога або консультація по роботі сервісу,
            напишіть нам листа на
            <span className="text-fire"> petshelp@gmail.com</span>
          </p>
          <div>
            <p>Графік роботи:</p>
            <p>Пн - Пт: з 8:00 до 20:00</p>
            <p>Сб - Нд: з 9:00 до 18:00</p>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 xl:gap-5">
          <h2 className="font-semibold">Онлайн-чат</h2>
          <p>
            Для спілкування зі службою підтримки ви можете скористатися
            чат-ботом, натиснувши на кнопку нижче. В чаті вам дадуть необхідну
            відповідь:
          </p>
        </div>
      </div>
      <a
        href="https://t.me/pets_help" // <-- встав свій лінк
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-lg bg-picton-blue gap-3.5"
      >
        <svg className="fill-alabaster h-4 w-4.5">
          <use href="/icons.svg#icon-tg" />
        </svg>
        <span>Telegram</span>
      </a>
    </div>
  );
};

export default ContactUs;
