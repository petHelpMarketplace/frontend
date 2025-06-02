export default function PersonalInfoBlock() {
  return (
    <div className="col-span-1 xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-x-23 gap-y-5">
      {/* Ім’я */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        >
          Ім’я
        </label>
        <input
          id="firstName"
          type="text"
          className="w-full border-2 border-fire rounded-2xl px-4 py-[11px] text-shark placeholder:text-storm-dust focus:outline-fire"
          placeholder="Введіть ім’я"
        />
      </div>

      {/* Прізвище */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        >
          Прізвище
        </label>
        <input
          id="lastName"
          type="text"
          className="w-full border-2 border-fire rounded-2xl px-4 py-[11px] text-shark placeholder:text-storm-dust focus:outline-fire"
          placeholder="Введіть прізвище"
        />
      </div>

      {/* Телефон */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        >
          Номер телефону
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full border-2 border-fire rounded-2xl px-4 py-[11px] text-shark placeholder:text-storm-dust focus:outline-fire"
          placeholder="+38 (0__) ___ __ __"
        />
      </div>

      {/* Район */}
      <div>
        <label
          htmlFor="district"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        >
          Район
        </label>
        <select
          id="district"
          className="w-full border-2 border-fire rounded-2xl px-4 py-[11px] text-shark focus:outline-fire"
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

      {/* Досвід */}
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        >
          Досвід роботи (роки)
        </label>
        <input
          id="experience"
          type="number"
          min="0"
          max="99"
          className="w-full border-2 border-fire rounded-2xl px-4 py-[11px] text-shark placeholder:text-storm-dust focus:outline-fire"
          placeholder="Наприклад: 2"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary text-white bg-fire hover:bg-hover transition px-8 py-3 rounded-lg text-base font-semibold"
      >
        Зберегти зміни
      </button>
    </div>
  );
}
