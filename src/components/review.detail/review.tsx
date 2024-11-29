import ReviewButton from "../review/reviewButton";
import style from "./review.module.css";

export default function Review({
  name,
  date,
  content,
}: {
  name: string;
  date: string;
  content: string;
}) {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <p className={style.name}>{name}</p>
        <p className={style.date}>{date} 촬영</p>
      </div>
      <p className={style.productName}>우정 스냅</p>
      <p className={style.content}>{content}</p>
      <ReviewButton />
    </div>
  );
}
