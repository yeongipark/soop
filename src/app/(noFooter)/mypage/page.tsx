"use client";

import ProtectedPage from "@/components/protectedPage";
import style from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    setNickname(localStorage.getItem("nickname") ?? "");
  }, []);

  return (
    <ProtectedPage>
      <div>
        <p className={style.title}>
          {nickname}님, 💁
          <br />
          반갑습니다.
        </p>
        <div className={style.menuWrap}>
          <Link href="/myinfo">
            <div className={style.menu}>
              <p>PROFILE</p>
              <p>고객님의 개인정보를 관리하는 곳입니다.</p>
            </div>
          </Link>
          <Link href="/reservation/check">
            <div className={style.menu}>
              <p>RESERVE</p>
              <p>고객님의 예약내역을 조회하는 곳입니다.</p>
            </div>
          </Link>
          <Link href={"/review/my"}>
            <div className={style.menu}>
              <p>REVIEW</p>
              <p>고객님의 리뷰를 관리하는 곳입니다.</p>
            </div>
          </Link>
          {/* <div className={style.menu}>
            <p>MILEAGE</p>
            <p>고객님의 적립금를 확인하는 곳입니다.</p>
          </div> */}
        </div>
      </div>
    </ProtectedPage>
  );
}
