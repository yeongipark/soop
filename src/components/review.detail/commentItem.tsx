import style from "./commentItem.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function CommentItem({
  date,
  name,
  content,
}: {
  date: string;
  name: string;
  content: string;
}) {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.wrap}>
          <p>{name}</p>
          <p className={style.date}>{date}</p>
        </div>
        <HiOutlineDotsHorizontal className={style.icon} />
      </div>
      <p className={style.content}>{content}</p>
    </div>
  );
}
