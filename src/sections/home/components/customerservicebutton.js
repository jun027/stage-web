'use client'
import Image from 'next/image';

export default function CustomerServiceButton() {
  const handleClick = () => {
    window.open('https://t.me/ublive_staffbot', '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={handleClick} className="focus:outline-none">
        <Image
          src="/images/buttons/telegram-01.png" //
          alt="Telegram"
          width={50}
          height={50}
          className="rounded-full shadow-lg hover:opacity-80"
        />
      </button>
    </div>
  );
}
