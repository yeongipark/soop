import style from "./review.module.css";
import ReviewItem from "./reviewItem";

export default function Review() {
  // 총 리뷰 갯수 나중에 서버와 통신으로 리뷰 총 개수 설정하기
  let total = 5;
  return (
    <div className={style.container}>
      {/* 3에 실제 리뷰 갯수 적기 */}
      <p className={style.title}>REVIEW ({total})</p>
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      {total >= 4 && (
        <div className={style.button}>
          <button>리뷰 더보기</button>
        </div>
      )}
    </div>
  );
}
