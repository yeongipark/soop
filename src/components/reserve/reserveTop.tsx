"use client";

import style from "./reserveTop.module.css";
import { useRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";
import Image from "next/image";

export default function ReserveTop() {
  const [reserveData] = useRecoilState(reservationState);

  return (
    <div className={style.top}>
      <div className={style.imageWrap}>
        <div className={style.imageWrap}>
          <Image
            src={reserveData.thumbnail}
            alt="상품 이미지"
            fill
            style={{ objectFit: "cover" }} // 이미지를 비율에 맞게 배경을 꽉 채움
          />
        </div>
      </div>
      <div className={style.textWrap}>
        <p>{reserveData.name}</p>
        <p>{reserveData.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
