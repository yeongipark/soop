"use client";

import style from "./post.module.css";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { noticeId } from "@/recoil/noticeIdAtom";

export default function Post({
  title,
  id,
  createdAt,
}: {
  title: string;
  id: number;
  createdAt: string;
}) {
  const shootDate = new Date(createdAt);
  const year = shootDate.getFullYear();
  const month = shootDate.getMonth() + 1;
  const date = shootDate.getDate();
  const setNoticeId = useSetRecoilState(noticeId);

  const onClick = () => {
    setNoticeId(id);
  };

  return (
    <div className={style.container}>
      <p className={style.title}>
        <Link
          onClick={onClick}
          href={{
            pathname: `/notice/detail/${id}`,
          }}
        >
          {title}
        </Link>
      </p>
      <p className={style.date}>
        {year}.{month}.{date}
      </p>
    </div>
  );
}
