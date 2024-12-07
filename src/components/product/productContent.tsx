import style from "./productCotent.module.css";
import Image from "next/image";
export default function ProductContent({
  content,
  images,
}: {
  content: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}) {
  return (
    <div className={style.container}>
      <p>{content}</p>
      <div className={style.imgWrap}>
        {images.map((img) => (
          <div className={style.img} key={img.id}>
            <Image
              src={img.url}
              alt="상품 정보 사진"
              layout="responsive"
              width={16} // 이미지의 가로 비율
              height={9} // 이미지의 세로 비율
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
