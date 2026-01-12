// this hook use localStorage to get and set state
import { useEffect, useState } from 'react';

export function useStoredState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    if (globalThis.window === undefined) {
      return defaultValue;
    }
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // localStorage might not be available
    }
  }, [key, state]);

  return [state, setState] as const;
}
