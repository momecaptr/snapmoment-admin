import {useEffect, useState} from "react";

export const useGetAccessKeyFromStorage = () => {
  // ! 1 вариант, не сработал
  // const [accessKey, setAccessKey] = useState<string | null>(null);
  //
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const key = localStorage.getItem("accessKey");
  //     setAccessKey(key);
  //   }
  // }, []);

  // ! 2 вариант, не сработал
  // let accessKey
  // useEffect(() => {
  //   accessKey = localStorage.getItem('accessKey')
  //   console.log(accessKey)
  // }, []);

  // typeof window !== 'undefined' && localStorage.getItem('accessKey')

  // ! 3 вариант четкий, работает
  return typeof window !== 'undefined' && localStorage.getItem('accessKey');
};