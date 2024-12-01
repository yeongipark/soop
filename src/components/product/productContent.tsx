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
        <div>
          <Image
            src={"/프로필사진.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/프로필사진.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/프로필사진.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/사진1.png"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/다운로드.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
