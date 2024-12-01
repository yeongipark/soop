"use client";
import { useNavScroll } from "@/hooks/useNavScroll";
import style from "./nav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useLogout from "@/hooks/auth/useLogout";
import { useRecoilState } from "recoil";
import { isLoginState } from "@/recoil/isLoginAtom";
import { useEffect } from "react";
import { getToken } from "@/util/cookie";
import Image from "next/image";

export default function Nav() {
  const { isScrolled } = useNavScroll();
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  // 로그아웃 눌렀을 때 실행할 함수
  const logout = useLogout();

  useEffect(() => {
    if (getToken()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <nav className={style.wrap}>
      <div
        className={`${style.container} ${isScrolled ? style.scrolled : ""}`}
        style={
          pathName !== "/"
            ? {
                display: "flex",
                justifyContent: "space-between",
              }
            : { background: "var(--background)" }
        }
      >
        {pathName !== "/" && (
          <p className={style.logo}>
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt="로고"
                width={100}
                height={100}
                layout="responsive"
              />
            </Link>
          </p>
        )}

        <div className={style.buttons}>
          <p>
            <Link href={"/product"}>예약하기</Link>
          </p>
          <p>소개</p>
          {isLogin && (
            <p>
              <Link href={"/mypage"}>마이페이지</Link>
            </p>
          )}
          <p>
            {isLogin ? (
              <span onClick={logout}>로그아웃</span>
            ) : (
              <Link href={"/login"}>로그인</Link>
            )}
          </p>
        </div>
      </div>
    </nav>
  );
}
