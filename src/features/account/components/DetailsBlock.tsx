export default function DetailsBlock() {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="about"
        className="block text-lg font-semibold text-fire mb-5"
      >
        Про себе
      </label>
      <textarea
        id="about"
        name="about"
        rows={6}
        className="flex flex-1 w-full border-2 border-fire rounded-2xl px-7 py-7 text-shark placeholder:text-storm-dust resize-none focus:outline-fire"
        placeholder="Приклад: Привіт! Я Ігор, з дитинства обжнюю тварин, особливо собак. Маю досвід у вигулі та догляді ..."
      />
    </div>
  );
}
