// components/account-data/DetailsBlock.tsx

export default function DetailsBlock() {
  return (
    <div className="flex flex-col gap-6">
      {/* Про себе */}
      <div>
        <label
          htmlFor="about"
          className="block text-lg font-medium text-shark mb-2"
        >
          Про себе
        </label>
        <textarea
          id="about"
          name="about"
          rows={6}
          className="w-full border border-gray--4 rounded-lg px-4 py-3 text-sm text-shark placeholder:text-gray--3 resize-none focus:outline-fire"
          placeholder="Напишіть кілька речень про себе, свої навички, підхід до роботи або бажаний графік..."
        />
      </div>

      {/* Ім’я та Прізвище */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-lg font-medium text-shark mb-2"
          >
            Ім’я
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full border border-gray--4 rounded-lg px-4 py-3 text-sm text-shark placeholder:text-gray--3 focus:outline-fire"
            placeholder="Введіть ім’я"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-lg font-medium text-shark mb-2"
          >
            Прізвище
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full border border-gray--4 rounded-lg px-4 py-3 text-sm text-shark placeholder:text-gray--3 focus:outline-fire"
            placeholder="Введіть прізвище"
          />
        </div>
      </div>

      {/* Телефон */}
      <div>
        <label
          htmlFor="phone"
          className="block text-lg font-medium text-shark mb-2"
        >
          Номер телефону
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full border border-gray--4 rounded-lg px-4 py-3 text-sm text-shark placeholder:text-gray--3 focus:outline-fire"
          placeholder="+38 (0__) ___ __ __"
        />
      </div>

      {/* Район та досвід */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="district"
            className="block text-lg font-medium text-shark mb-2"
          >
            Район
          </label>
          <select
            id="district"
            className="w-full border border-gray--4 rounded-lg px-4 py-3 text-sm text-shark focus:outline-fire"
            defaultValue=""
          >
            <option value="" disabled>
              Оберіть район
            </option>
            <option value="Шевченківський">Шевченківський</option>
            <option value="Солом’янський">Солом’янський</option>
            <option value="Голосіївський">Голосіївський</option>
            <option value="Дарницький">Дарницький</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="experience"
            className="block text-lg font-medium text-shark mb-2"
          >
            Досвід роботи (роки)
          </label>
          <input
            id="experience"
            type="number"
            min="0"
            max="99"
            className="w-full border border-gray--4 rounded-lg px-4 py-3 text-sm text-shark placeholder:text-gray--3 focus:outline-fire"
            placeholder="Наприклад: 2"
          />
        </div>
      </div>

      {/* Кнопка Зберегти */}
      <div className="pt-2">
        <button
          type="submit"
          className="btn btn-primary text-white bg-fire hover:bg-hover transition px-8 py-3 rounded-lg text-base font-semibold"
        >
          Зберегти зміни
        </button>
      </div>
    </div>
  );
}
