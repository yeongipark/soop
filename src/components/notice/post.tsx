import style from "./post.module.css";
import Link from "next/link";

export default function Post({ title, id }: { title: string; id: number }) {
  return (
    <div className={style.container}>
      <p className={style.title}>
        <Link
          href={{
            pathname: `/notice/detail/${id}`,
            query: { title },
          }}
        >
          {title}
        </Link>
      </p>
      <p className={style.date}>2024.10.25</p>
    </div>
  );
}
