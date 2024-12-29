import style from "./comment.module.css";
import CommentItem from "./commentItem";

// CommentResponse 타입 정의
interface CommentResponse {
  id: number;
  writer: string;
  content: string;
  createdAt: string; // ISO 8601 날짜 문자열
}

export default function Comment({
  contents,
  reviewId,
}: {
  contents: CommentResponse[];
  reviewId: string | number;
}) {
  return (
    <div className={style.container}>
      <p className={style.title}>댓글 ({contents.length})</p>
      {contents.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          name={comment.writer}
          date={comment.createdAt}
          content={comment.content}
          reviewId={reviewId}
        />
      ))}
    </div>
  );
}
