import style from "./productCard.module.css";
import Image from "next/image";
export default function ProductCard() {
  return (
    <div className={style.container}>
      <div className={style.img}>
        <Image
          src={"/프로필사진.jpg"}
          alt="프로필 사진"
          layout="responsive"
          width={100}
          height={50}
        ></Image>
      </div>
      <div className={style.text}>
        <p>개인 프로필</p>
        <p>한줄 소개...</p>
      </div>
    </div>
  );
}
