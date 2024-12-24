"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/util/cookie";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>; // 인증 통과 시 렌더링
}
