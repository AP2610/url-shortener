'use client';

import { useEffect, useState } from 'react';

export const useCountdown = (initialValue: number, onComplete: () => void) => {
  const [countdown, setCountdown] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onComplete]);

  // Needs to be in a separate useEffect in case the onComplete updates a component. This cannot happen during the render phase.
  useEffect(() => {
    if (countdown <= 1) {
      onComplete();
    }
  }, [countdown, onComplete]);

  return countdown;
};
