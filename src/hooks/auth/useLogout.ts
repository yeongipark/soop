import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";
import { deleteToken, getToken } from "@/util/cookie";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const [_, setIsLogin] = useRecoilState(isLoginState);
  const router = useRouter();

  // 비동기 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("로그아웃에 실패했습니다.");
      }

      // 로그아웃 성공 처리
      setIsLogin(false);
      // 캐시에서 삭제하기
      deleteToken();

      // 로그아웃 하고 홈으로 리다이렉트
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  return handleLogout; // 비동기 로그아웃 함수 반환
}
