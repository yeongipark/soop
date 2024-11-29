import style from "./comment.module.css";
import CommentItem from "./commentItem";

const data = [
  {
    id: 1,
    name: "딸기모찌붕어빵",
    date: "2024.11.08",
    content: "혹시 촬영은 어디서 하셨나요?",
  },
  {
    id: 2,
    name: "딸기모찌붕어빵",
    date: "2024.11.08",
    content: "혹시 촬영은 어디서 하셨나요?",
  },
  {
    id: 3,
    name: "딸기모찌붕어빵",
    date: "2024.11.08",
    content: "혹시 촬영은 어디서 하셨나요?",
  },
  {
    id: 4,
    name: "딸기모찌붕어빵",
    date: "2024.11.08",
    content: "혹시 촬영은 어디서 하셨나요?",
  },
];

export default function Comment() {
  return (
    <div className={style.container}>
      <p className={style.title}>댓글 ({data.length})</p>
      {data.map((comment) => (
        <CommentItem
          key={comment.id}
          name={comment.name}
          date={comment.date}
          content={comment.content}
        />
      ))}
    </div>
  );
}
