import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";

export default function useLogout() {
  const [_, setIsLogin] = useRecoilState(isLoginState);

  // 비동기 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        console.error(res);
        throw new Error("로그아웃에 실패했습니다.");
      }

      // 로그아웃 성공 처리
      setIsLogin(false);
      console.log("Logged out successfully");

      // localStorage에서 토큰 삭제
      localStorage.removeItem("accessToken");
    } catch (e) {
      console.error(e);
    }
  };

  return handleLogout; // 비동기 로그아웃 함수 반환
}
