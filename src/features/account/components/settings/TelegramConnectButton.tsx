import { useState } from 'react';

const TelegramConnectButton = () => {
  const [isConnected, setIsConnected] = useState(false); // можна замінити Redux'ом

  const handleConnect = () => {
    // Псевдо-логіка для інтеграції
    // В реальності: відкриття Telegram OAuth, або WebApp Login
    console.log('Redirect to Telegram');
    // window.open('https://telegram.me/your_bot?start=some_token', '_blank');
    setIsConnected(true);
  };

  return (
    <button
      onClick={handleConnect}
      type="button"
      className="w-2/3 h-12 btn bg-picton-blue text-alabaster flex items-center justify-center gap-4 rounded-2xl"
    >
      <svg
        className="w-4.5 h-4.5 fill-alabaster"
        aria-label={isConnected ? 'Telegram підключено' : 'Зайти з Telegram'}
      >
        <use href="/icons.svg#icon-tg" />
      </svg>
      {isConnected ? 'Telegram підключено' : 'Зайти з Telegram'}
    </button>
  );
};

export default TelegramConnectButton;
