import style from "./reviewItem.module.css";
import ReviewButton from "./reviewButton";
import Link from "next/link";
export default function ReviewItem({
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
      <Link
        href={{ pathname: "/review/detail", query: { name, date, content } }}
      >
        <div className={style.title}>
          <p>{name}</p>
          <p>{date} 촬영</p>
        </div>
      </Link>

      <div className={style.content}>
        <Link
          href={{ pathname: "/review/detail", query: { name, date, content } }}
        >
          <p>{content}</p>
        </Link>
      </div>
      <ReviewButton />
    </div>
  );
}
