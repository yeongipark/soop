"use client";
import style from "./reviewButton.module.css";
import { useState } from "react";

export default function ReviewButton() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(13);

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
