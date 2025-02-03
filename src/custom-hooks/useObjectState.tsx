import { useState } from "react";

function useObjectState<T, U extends keyof T>(defaultValue = {} as T) {
  const [obj, setObj] = useState(defaultValue);

  const get = (key: U, defaultFieldValue?: T[U]) => {
    if (!key) return obj;
    return obj[key] ?? defaultFieldValue;
  };

  const update = (key: U, value: T[U]) => {
    setObj({ ...obj, [key]: value });
  };

  return { obj, get, update, setObj } as const;
}

export default useObjectState;
