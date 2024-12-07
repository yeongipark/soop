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
          <p className={style.date}>{formatDate(date)}</p>
        </div>
        <HiOutlineDotsHorizontal className={style.icon} />
      </div>
      <p className={style.content}>{content}</p>
    </div>
  );
}

function formatDate(date: string): string {
  const d = new Date(date);
  const now = Date.now();
  const diffInSeconds = Math.floor((now - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    // 1분 미만
    return "방금 전";
  }

  if (diffInSeconds < 3600) {
    // 1시간 미만
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  }

  if (diffInSeconds < 86400) {
    // 24시간 미만
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  }

  if (diffInSeconds < 86400 * 7) {
    // 7일 미만
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }

  if (diffInSeconds < 86400 * 30) {
    // 1개월 미만
    const weeks = Math.floor(diffInSeconds / (86400 * 7));
    return `${weeks}주일 전`;
  }

  if (diffInSeconds < 86400 * 365) {
    // 1년 미만
    const months = Math.floor(diffInSeconds / (86400 * 30));
    return `${months}개월 전`;
  }

  // 1년 이상
  const years = Math.floor(diffInSeconds / (86400 * 365));
  return `${years}년 전`;
}
