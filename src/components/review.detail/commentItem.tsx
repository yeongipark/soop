import { format, formatDistanceToNow } from "date-fns";
import style from "./commentItem.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ko } from "date-fns/locale";

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
          <p className={style.date}>{formatDate(date)}</p>
        </div>
        <HiOutlineDotsHorizontal className={style.icon} />
      </div>
      <p className={style.content}>{content}</p>
    </div>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60 * 1) {
    return "방금 전";
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, "PPP EEE p", { locale: ko });
}
