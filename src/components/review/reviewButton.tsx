"use client";
import style from "./reviewButton.module.css";
import { useState } from "react";

export default function ReviewButton({
  helpCnt,
  isHelped,
}: {
  helpCnt: number;
  isHelped: boolean;
}) {
  const [liked, setLiked] = useState(isHelped ?? false);
  const [likeCount, setLikeCount] = useState(helpCnt ?? 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className={style.container}>
      <span
        className={`${style.likeBtn} ${liked ? style.clicked : ""}`}
        onClick={handleLike}
      >
        <span className={`${liked ? style.btnAnimation : ""}`}>👍</span>도움돼요{" "}
        <span>{likeCount}</span>
      </span>
    </div>
  );
}
