import { useState, useEffect } from "react";

export const useDebounce = <T>(value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    });

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
