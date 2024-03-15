import { useEffect, useState } from 'react';

export const useMouseCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cursorPos = (evt: Event) => {
    const event = evt as unknown as React.MouseEvent;
    setPos({ x: event.clientX, y: event.clientY });
  };
  useEffect(() => {
    window.addEventListener('mousemove', cursorPos);
    return () => {
      window.removeEventListener('mousemove', cursorPos);
    };
  }, []);
  return pos;
};
