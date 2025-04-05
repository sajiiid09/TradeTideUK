"use client";

import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const isBrowser = typeof window !== "undefined";

  const getLocalStorage = (key: string) => {
    if (!isBrowser) return null;
    const item = localStorage.getItem(key);
    return item ? item : null;
  };

  const setLocalStorage = (key: string, value: string) => {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
  };

  const clearLocalStorage = () => {
    if (!isBrowser) return;
    localStorage.clear();
  };

  return { clearLocalStorage, getLocalStorage, setLocalStorage };
};

export const useLocalStorageState = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T | string>(() => {
    if (typeof window === "undefined") return initialValue;
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      setStoredValue(JSON.parse(storedItem));
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
