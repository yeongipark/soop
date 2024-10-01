import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";

// 로그인 로직
const useLogin = (provider: string, code: string) => {
  const router = useRouter();
  const [_, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    const login = async () => {
      try {
        const res = await fetch(
          `http://${process.env.NEXT_PUBLIC_SERVER_URL}/login/${provider}`,
          {
            method: "POST",
            body: JSON.stringify({ code }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        // 어세스 토큰 받아오기 (리프레시 토큰은 쿠키에 담김)
        const accessToken = res.headers.get("access-token");
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          setIsLogin(true);
          // 성공적으로 로그인 처리 후 홈화면으로 리디렉션
          router.push("/");
        } else {
          throw new Error("Access token is missing.");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    if (code) {
      login();
    }
  }, [provider, code, router]);
};

export default useLogin;
