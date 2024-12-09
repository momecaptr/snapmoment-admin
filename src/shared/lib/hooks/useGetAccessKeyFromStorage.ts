"use client"
import {useEffect, useState} from "react";

export const useGetAccessKeyFromStorage = () => {
  const [accessKey, setAccessKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const key = localStorage.getItem('accessKey') || "";
      setAccessKey(key);
    }
  }, []); // Выполняется только на клиенте.
  // useEffect(() => {
  //   const data = localStorage.getItem('key');
  //   if (data) {
  //     setAccessKey(JSON.parse(data) || "");
  //   }
  // }, []);


  return accessKey;
};