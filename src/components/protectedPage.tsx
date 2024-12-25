"use client";

import { useRouter } from "next/navigation";
import { getToken } from "@/util/cookie";
import Alert from "./alert";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = getToken();

  if (!token) {
    return (
      <Alert
        title="로그인후 다시 이용해 주세요."
        type="cancel"
        setModalState={() => {
          router.replace("/");
        }}
      />
    );
  }

  return <>{children}</>; // 인증 통과 시 렌더링
}
