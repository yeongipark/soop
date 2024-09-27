"use client";
import { useNavScroll } from "@/hooks/useNavScroll";
import style from "./nav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const { isScrolled } = useNavScroll();
  const pathName = usePathname();
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
          <p>
            <Link href={"/login"}>로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
