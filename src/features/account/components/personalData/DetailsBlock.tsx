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
        className="w-full flex flex-1 input-base h-12 p-6"
        placeholder="Приклад: Привіт! Я Ігор, з дитинства обжнюю тварин, особливо собак. Маю досвід у вигулі та догляді ..."
      />
    </div>
  );
}
