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
            src={`https://image.re-bin.kr/rebin/${reserveData.thumbnail}`}
            alt="상품 이미지"
            width={100}
            height={50}
            layout="responsive"
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
