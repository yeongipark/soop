import style from "./page.module.css";
import Post from "@/components/notice/post";
import Pagination from "@/components/notice/pagination";

export default function Page() {
  return (
    <div className={style.container}>
      <p className={style.title}>공지사항</p>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Pagination total={22} />
    </div>
  );
}
