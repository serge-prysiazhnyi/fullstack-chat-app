import { useEffect, useRef } from 'react';

export const useScrollToBottom = <T extends HTMLElement, D>(
  dependencies: D,
) => {
  const lastElementRef = useRef<T>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependencies]);

  return lastElementRef;
};
