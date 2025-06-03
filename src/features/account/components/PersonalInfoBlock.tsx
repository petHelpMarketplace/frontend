export default function PersonalInfoBlock() {
  return (
    <div className="col-span-1 xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-x-23 gap-y-5">
      {/* Ім’я */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <div className="relative flex items-center">
          <input
            id="firstName"
            type="text"
            className="w-full input-base h-12"
            placeholder="Ім'я"
          />
          <svg
            className="absolute w-6 h-6 fill-mist-gray right-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil" />
          </svg>
          <svg
            className="absolute w-3 h-3 fill-fire -right-4"
            aria-label="Обов'язкове поле"
          >
            <use href="/icons.svg#icon-required-field" />
          </svg>
        </div>
      </div>

      {/* Район */}
      <div>
        <label
          htmlFor="district"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <select
          id="district"
          className="w-full input-base h-12"
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

      {/* Прізвище */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <div className="relative flex items-center">
          <input
            id="lastName"
            type="text"
            className="w-full input-base h-12"
            placeholder="Прізвище"
          />
          <svg
            className="absolute w-6 h-6 fill-mist-gray right-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil" />
          </svg>
        </div>
      </div>

      {/* Досвід */}
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <input
          id="experience"
          type="number"
          min="0"
          max="99"
          className="w-full input-base h-12"
          placeholder="Досвід (років)"
        />
      </div>

      {/* Телефон */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-tenn pl-4 mb-1"
        ></label>
        <div className="relative flex items-center">
          <input
            id="phone"
            type="tel"
            className="w-full input-base h-12"
            placeholder="+38 (0__) ___ __ __"
          />
          <svg
            className="absolute w-6 h-6 fill-mist-gray right-6"
            aria-label="Редагувати"
          >
            <use href="/icons.svg#icon-pencil" />
          </svg>
          <svg
            className="absolute w-3 h-3 fill-fire -right-4"
            aria-label="Обов'язкове поле"
          >
            <use href="/icons.svg#icon-required-field" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary object-fill w-fit mt-auto text-alabaster bg-tenn hover:bg-hover transition px-23 py-3 rounded-2xl h-12"
      >
        Зберегти зміни
      </button>
    </div>
  );
}
