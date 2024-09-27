import style from "./reviewItem.module.css";
import ReviewButton from "./reviewButton";
export default function ReviewItem() {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <p>딸기모찌붕어빵</p>
        <p>24.09.19 촬영</p>
      </div>

      <div className={style.content}>
        <p>
          딸기모찌붕어빵 24.09.19 촬영 모든 과정을 다 친절하고 열정적으로
          임해주셔서 감동이었습니다! 덕분에 좋은 사진과 재밌는 경험 가질 수
          있었습니다.앞으로도 작가님 번창하셨으면 좋겠습니다!!!
        </p>
      </div>
      <ReviewButton />
    </div>
  );
}
