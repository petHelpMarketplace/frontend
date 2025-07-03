type Props = {
  text: string | null;
  truncate?: boolean;
};

const Bio = ({ text, truncate = true }: Props) => {
  // Чистимо всі "дивні" пробіли, таби, ентери, не-розривні пробіли
  const cleanText = text
    ? text.replace(/[\s\u00A0]+/g, ' ').replace(/^\s+|\s+$/g, '')
    : null;

  return (
    <p
      className={`w-full text-sm text-cod-gray text-justify break-words whitespace-normal leading-[146%] ${
        truncate ? 'line-clamp-5 xl:line-clamp-8' : ''
      }`}
    >
      <span className="font-semibold">Про себе:</span>{' '}
      {cleanText || 'Опис відсутній'}
    </p>
  );
};

export default Bio;
