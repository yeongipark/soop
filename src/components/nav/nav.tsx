"use client";
import { useNavScroll } from "@/hooks/useNavScroll";
import style from "./nav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useLogout from "@/hooks/auth/useLogout";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";

export default function Nav() {
  const { isScrolled } = useNavScroll();
  const pathName = usePathname();
  const isLogin = useRecoilValue(isLoginState);

  // 로그아웃 눌렀을 때 실행할 함수
  const logout = useLogout();

  return (
    <div className={style.wrap}>
      <div
        className={`${style.container} ${isScrolled ? style.scrolled : ""}`}
        style={
          pathName !== "/"
            ? {
                display: "flex",
                justifyContent: "space-between",
              }
            : undefined
        }
      >
        {pathName !== "/" && (
          <p className={style.logo}>
            <Link href={"/"}>
              SO
              <br />
              OP
            </Link>
          </p>
        )}

        <div className={style.buttons}>
          <p>
            <Link href={"/product"}>예약하기</Link>
          </p>
          <p>소개</p>
          {isLogin && <p>마이페이지</p>}
          <p>
            {isLogin ? (
              <p onClick={logout}>로그아웃</p>
            ) : (
              <Link href={"/login"}>로그인</Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
