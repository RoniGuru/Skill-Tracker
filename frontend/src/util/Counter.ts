import { useEffect, useState } from 'react';

export const counter = (time: number, callback: () => void) => {
  const [seconds, setSeconds] = useState<number>(time);

  const interval = 1000;

  useEffect(() => {
    const customInterval = setInterval(() => {
      setSeconds((prev) => prev + interval);
    }, interval);
    if (seconds === 0) callback();
    return () => clearInterval(customInterval);
  }, [seconds]);
};
