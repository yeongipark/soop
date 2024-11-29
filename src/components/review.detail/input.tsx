import style from "./input.module.css";
import { IoArrowUpCircleOutline } from "react-icons/io5";

export default function Input() {
  return (
    <div className={style.container}>
      <input type="text" placeholder="댓글을 남겨주세요." />
      <IoArrowUpCircleOutline className={style.icon} />
    </div>
  );
}
