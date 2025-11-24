import React, { useEffect, useState } from 'react';

const BackgroundHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; top: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 10}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-gradient-to-br from-pink-100 via-red-50 to-pink-200">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 opacity-50 floating-heart"
          style={{
            left: heart.left,
            top: heart.top,
            fontSize: heart.size,
            animationDelay: heart.delay,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default BackgroundHearts;