import style from "./page.module.css";
import MyInfo from "@/components/myinfo/myinfo";

export default function Page() {
  return (
    <div>
      <p className={style.title}>내 정보 관리</p>
      <MyInfo />
    </div>
  );
}
