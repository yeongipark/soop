import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";
import { deleteToken } from "@/util/cookie";
import { useRouter } from "next/navigation";
import apiClient from "@/util/axios";

export default function useLogout() {
  const [_, setIsLogin] = useRecoilState(isLoginState);
  const router = useRouter();

  // 비동기 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      const res = await apiClient("/api/logout", {
        method: "delete",
        withCredentials: true,
      });

      // if (res.status !== 200) {
      //   throw new Error("로그아웃에 실패했습니다.");
      // }

      // 로그아웃 성공 처리
      setIsLogin(false);
      // 캐시에서 토큰 삭제
      deleteToken();
      // 로컬스토리지에서 토큰 삭제
      localStorage.removeItem("accessToken");

      // 로그아웃 후 홈으로 리다이렉트
      router.replace("/");
    } catch (error) {
      console.error("Unexpected Error during logout:", error);
    }
  };

  return handleLogout; // 비동기 로그아웃 함수 반환
}
