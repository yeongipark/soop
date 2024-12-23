"use client";

import style from "./post.module.css";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { noticeId } from "@/recoil/noticeIdAtom";

export default function Post({ title, id }: { title: string; id: number }) {
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
            pathname: `/notice/detail`,
          }}
        >
          {title}
        </Link>
      </p>
      <p className={style.date}>2024.10.25</p>
    </div>
  );
}
