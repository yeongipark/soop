import style from "./page.module.css";
import PostList from "@/components/notice/postList";

export default function Page() {
  return (
    <div className={style.container}>
      <p className={style.title}>공지사항</p>
      <PostList />
    </div>
  );
}
