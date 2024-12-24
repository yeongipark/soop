"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";
import apiClient from "@/util/axios";
import { setToken } from "@/util/cookie";
import Loading from "@/components/loading/loading";

export default function ClientLoginPage({ provider }: { provider: string }) {
  const router = useRouter();
  const [_, setIsLogin] = useRecoilState(isLoginState);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const login = async () => {
      try {
        const res = await apiClient.post(`/api/login/${provider}`, {
          code,
        });

        // HTTP 상태 코드 확인
        if (res.status !== 201) {
          throw new Error(`Login failed with status ${res.statusText}`);
        }

        // 어세스 토큰 받아오기
        const accessToken = res.headers["access-token"]; // 헤더 값 읽기
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 저장
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

    if (code) {
      login();
    }
  }, [provider]);

  return (
    <div>
      <Loading text="로그인 중입니다." />
    </div>
  );
}
