import ReviewButton from "../review/reviewButton";
import style from "./review.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Review({
  name,
  date,
  content,
  helpCnt,
  isHelped,
  reviewId,
  onClick,
}: {
  name: string;
  date: string;
  content: string;
  helpCnt: number;
  isHelped: boolean;
  reviewId: number;
  onClick?: (e?: React.ChangeEvent<HTMLAllCollection>) => void;
}) {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.infoWrap}>
          <p className={style.name}>{name}</p>
          <p className={style.date}>{date} 촬영</p>
        </div>
        <HiOutlineDotsHorizontal className={style.icon} onClick={onClick} />
      </div>
      <p className={style.productName}>우정 스냅</p>
      <p className={style.content}>{content}</p>
      <ReviewButton
        reviewId={reviewId}
        helpCnt={+helpCnt}
        isHelped={isHelped}
      />
    </div>
  );
}
