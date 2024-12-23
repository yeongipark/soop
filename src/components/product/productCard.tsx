"use client";

import Link from "next/link";
import style from "./productCard.module.css";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { productIdState } from "@/recoil/productIdAtom";

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
  const setProductIdState = useSetRecoilState(productIdState);
  const onClick = () => {
    setProductIdState(id);
  };

  return (
    <div className={style.container}>
      <Link
        href={{
          pathname: "/detail",
        }}
      >
        <div onClick={onClick}>
          <div className={style.img}>
            <Image
              src={thumbnail}
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
        </div>
      </Link>
    </div>
  );
}
