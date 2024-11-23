import { useState, useEffect, useCallback } from 'react';

function usePersistedState<T>(key: string, defaultValue: T): [T, (value: T) => void, () => void] {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  const clearState = useCallback(() => {
    setState(defaultValue); // Reset to default value or empty
    localStorage.removeItem(key); // Clear from local storage
  }, [key, defaultValue]);

  return [state, setState, clearState];
}
export default  usePersistedState; 