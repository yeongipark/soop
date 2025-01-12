"use client";

import Link from "next/link";
import style from "./productCard.module.css";
import Image from "next/image";

export default function ProductCard({
  id,
  name,
  thumbnail,
  summary,
}: {
  id: number;
  name: string;
  thumbnail: string;
  summary: string;
}) {
  return (
    <div className={style.container}>
      <Link
        href={{
          pathname: `/detail/${id}`,
        }}
      >
        <div className={style.img}>
          <Image
            src={`https://image.re-bin.kr/rebin/${thumbnail}`}
            alt="상품 사진"
            layout="responsive"
            width={100}
            height={50}
          ></Image>
        </div>
        <div className={style.text}>
          <p>{name}</p>
          <p>{summary}</p>
        </div>
      </Link>
    </div>
  );
}
