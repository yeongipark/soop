"use client";

import Footer from "@/components/footer/footer";
import Nav from "@/components/nav/nav";
import { useRouter } from "next/navigation";
import style from "./not-found.tsx.module.css";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <Nav />
      <div className={style.container}>
        <p className={style.number}>404</p>
        <p className={style.title}>찾을 수 없는 페이지 입니다.</p>
        <p className={style.subTitle}>
          요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 ;)
        </p>
        <p className={style.home}>
          <Link href={"/"}>홈으로</Link>
        </p>
      </div>
    </div>
  );
}
