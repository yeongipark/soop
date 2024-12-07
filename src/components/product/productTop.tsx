import Image from "next/image";
import style from "./productTop.module.css";

interface ProductTopType {
  id?: string;
  name: string;
  thumbnail: string;
  price: string;
  summary: string;
}

export default function ProductTop({
  name,
  thumbnail,
  price,
  summary,
}: ProductTopType) {
  return (
    <div>
      <div className={style.imgContainer}>
        <Image alt="상품 사진" fill src={thumbnail} />
      </div>
      <div className={style.textContainer}>
        <p>{name}</p>
        <p>{summary}</p>
        <p>{Number(price).toLocaleString()}</p>
      </div>
    </div>
  );
}
