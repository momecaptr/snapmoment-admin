import {useEffect, useState} from "react";

export const useGetAccessKeyFromStorage = () => {
  const [accessKey, setAccessKey] = useState<string | null>(null);

  useEffect(() => {
    const IS_SERVER = typeof window === "undefined";
    if (!IS_SERVER) {
      const key = localStorage.getItem('accessKey');
      setAccessKey(key);
    }
  }, []);
  return {accessKey};
};