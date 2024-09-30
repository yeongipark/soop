import { useState } from "react";

interface UsePostOptionData<T> {
  url: string;
  data: T;
  useToken: boolean;
}

export default function usePostOption<T>({
  url,
  data,
  useToken,
}: UsePostOptionData<T>) {
  const [loading, setLoading] = useState(false);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (useToken) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const postData = async () => {
    // 이미 로딩 중이면 요청을 막기
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `http://${process.env.NEXT_PUBLIC_SERVER_URL}${url}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers,
        }
      );

      if (!res.ok) {
        throw new Error(`에러발생`);
      }

      return await res.json();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading };
}
