import { Http } from "@/utils/globalInterfaces";
import { useState } from "react";

const useHttp = () => {
  const [httpResponse, setHttpResponse] = useState<Http>({
    result: null,
    error: null,
  });

  const sendHttpRequest = async (url: string, options: RequestInit) => {
    try {
      const res = await fetch(url, options);
      const result = await res.json();

      setHttpResponse({ result, error: null });
    } catch (error: any) {
      setHttpResponse({ result: null, error: error.message });
    }
  };

  return { httpResponse, sendHttpRequest };
};

export default useHttp;
