import { Http } from "@/utils/globalInterfaces";
import { useState } from "react";

const useHttp = () => {
  const [httpResponse, setHttpResponse] = useState<Http>({
    result: null,
    error: "",
    loading: false,
  });

  const sendHttpRequest = async (url: string, options: RequestInit) => {
    setHttpResponse({ result: null, error: "", loading: true });

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Error (${res.status}): ${res.statusText}`);
      const result = await res.json();

      console.log(result);

      setHttpResponse({ result, error: "", loading: false });
    } catch (error: any) {
      setHttpResponse({ result: null, error: error.message, loading: false });
    }
  };

  return { httpResponse, sendHttpRequest };
};

export default useHttp;
