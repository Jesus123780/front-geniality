import { useState, useEffect } from 'react';

export const useTimer = (isActive: boolean) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const formattedTime = new Date(seconds * 1000).toISOString().substr(14, 5);

  return formattedTime;
};
