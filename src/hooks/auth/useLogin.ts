import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";
import { setToken } from "@/util/cookie";

// 로그인 로직
const useLogin = (provider: string, code: string) => {
  const router = useRouter();
  const [_, setIsLogin] = useRecoilState(isLoginState);
  // ${process.env.NEXT_PUBLIC_SERVER_URL}
  useEffect(() => {
    const login = async () => {
      try {
        const res = await fetch(`https://api.re-bin.kr/login/${provider}`, {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        // 어세스 토큰 받아오기 (리프레시 토큰은 쿠키에 담김)
        const accessToken = res.headers.get("access-token");
        if (accessToken) {
          setToken(accessToken);
          setIsLogin(true);
          // 성공적으로 로그인 처리 후 2번 이전 화면으로 리디렉션
          window.history.go(-2);
        } else {
          throw new Error("Access token is missing.");
        }
      } catch (error) {
        console.log("Login failed:", error);
      }
    };

    if (code) {
      login();
    }
  }, [provider, code, router]);
};

export default useLogin;
