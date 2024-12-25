import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";
import { setToken } from "@/util/cookie";
import apiClient from "@/util/axios";

const useLogin = (provider: string, code: string) => {
  const router = useRouter();
  const [_, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    const login = async () => {
      try {
        const res = await apiClient.post(`/api/login/${provider}`, {
          code, // 데이터는 JSON으로 전달
        });

        // HTTP 상태 코드 확인
        if (res.status !== 201) {
          throw new Error(`Login failed with status ${res.statusText}`);
        }

        // 어세스 토큰 받아오기
        const accessToken = res.headers["access-token"]; // 헤더 값 읽기
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 저장
          localStorage.setItem("nickname", res.data);
          setToken(accessToken); // 쿠키에 저장
          setIsLogin(true); // 로그인 상태 업데이트

          // 성공적으로 로그인 후 홈 화면으로 리다이렉트
          router.push("/");
        } else {
          throw new Error("Access token is missing.");
        }
      } catch (error) {
        console.error("Unexpected Error:", error);
      }
    };

    // `code`가 유효할 때만 로그인 시도
    if (code) {
      login();
    }
  }, [provider, code, router, setIsLogin]);
};

export default useLogin;
