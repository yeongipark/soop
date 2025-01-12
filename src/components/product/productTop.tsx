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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={style.imgContainer}>
          <Image
            alt="상품 사진"
            width={16}
            height={9}
            layout="responsive"
            src={`https://image.re-bin.kr/rebin/${thumbnail}`}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className={style.textContainer}>
        <p>{name}</p>
        <p>{summary}</p>
        <p>{Number(price).toLocaleString()}</p>
      </div>
    </div>
  );
}
