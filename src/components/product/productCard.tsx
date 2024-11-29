import Link from "next/link";
import style from "./productCard.module.css";
import Image from "next/image";
export default function ProductCard({
  id,
  name,
  thumbnail,
  price,
  summary,
}: {
  id: number;
  name: string;
  thumbnail: string;
  summary: string;
  price: number;
}) {
  return (
    <div className={style.container}>
      <Link
        href={{
          pathname: `/detail/${id}`,
          query: { id, name, thumbnail, price, summary },
        }}
      >
        <div className={style.img}>
          <Image
            src={`/프로필사진.jpg`}
            alt="프로필 사진"
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
