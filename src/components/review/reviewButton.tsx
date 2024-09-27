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
    <div className={style.button} onClick={handleLike}>
      <span>{likeCount}</span>
      <span className={`${liked ? style.clicked : ""}`}>👍 도움 돼요</span>
    </div>
  );
}
