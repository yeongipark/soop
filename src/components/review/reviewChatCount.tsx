import style from "./reviewButton.module.css";

export default function ReviewChatCount({
  commentCnt,
}: {
  commentCnt: number;
}) {
  return (
    <div className={style.container}>
      <span className={style.likeBtn}>💬댓글({commentCnt})</span>
    </div>
  );
}
