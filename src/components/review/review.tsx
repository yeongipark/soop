import style from "./review.module.css";
import ReviewItem from "./reviewItem";

const data = [
  {
    id: 1,
    name: "딸기모찌붕어빵",
    date: "2024.09.19",
    content:
      "모든 과정을 다 친절하고 열정적으로 임해주셔서 감동이었습니다! 덕분에 좋은 사진과 재밌는 경험 가질 수 있었습니다. \n 앞으로도 작가님 번창하셨으면 좋겠습니다!!!",
  },
  {
    id: 2,
    name: "딸기모찌붕어빵",
    date: "2024.09.19",
    content:
      "모든 과정을 다 친절하고 열정적으로 임해주셔서 감동이었습니다! 덕분에 좋은 사진과 재밌는 경험 가질 수 있었습니다. \n 앞으로도 작가님 번창하셨으면 좋겠습니다!!!",
  },
  {
    id: 3,
    name: "딸기모찌붕어빵",
    date: "2024.09.19",
    content:
      "모든 과정을 다 친절하고 열정적으로 임해주셔서 감동이었습니다! 덕분에 좋은 사진과 재밌는 경험 가질 수 있었습니다. \n 앞으로도 작가님 번창하셨으면 좋겠습니다!!!",
  },
  {
    id: 4,
    name: "딸기모찌붕어빵",
    date: "2024.09.19",
    content:
      "모든 과정을 다 친절하고 열정적으로 임해주셔서 감동이었습니다! 덕분에 좋은 사진과 재밌는 경험 가질 수 있었습니다. \n 앞으로도 작가님 번창하셨으면 좋겠습니다!!!",
  },
];

export default function Review() {
  // 총 리뷰 갯수 나중에 서버와 통신으로 리뷰 총 개수 설정하기
  const total = 5;
  return (
    <div className={style.container}>
      {/* 3에 실제 리뷰 갯수 적기 */}
      <p className={style.title}>REVIEW ({total})</p>
      {data.map((review) => (
        <ReviewItem
          content={review.content}
          date={review.date}
          name={review.name}
          key={review.id}
        />
      ))}
      {total >= 4 && (
        <div className={style.button}>
          <button>리뷰 더보기</button>
        </div>
      )}
    </div>
  );
}
