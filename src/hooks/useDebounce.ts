import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce a value.
 *
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer that updates the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timer if the value changes or the component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
