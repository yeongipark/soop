import Image from "next/image";
import style from "./card.module.css";

export default function Card() {
  return (
    <div className={style.container}>
      <a href="/reservation/detail" className={style.detail}>
        예약 상세 {">"}
      </a>
      <p className={style.title}>촬영 완료!</p>
      <p className={style.subTitle}>리뷰 작성 부탁드립니다!</p>
      <div className={style.productWrap}>
        <div className={style.imageContainer}>
          <Image
            alt="상품 사진"
            src={"/프로필사진.jpg"}
            layout="responsive"
            width={100}
            height={100}
            objectFit="cover" // 이미지 크기 조정 시 비율 유지
          />
        </div>
        <div className={style.info}>
          <p>개인 프로필</p>
          <p>2024. 09. 23 촬영</p>
        </div>
      </div>
      <div className={style.buttonWrap}>
        <button>다시 예약</button>
        <button>리뷰 작성</button>
        <button>...</button>
      </div>
    </div>
  );
}
