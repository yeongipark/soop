import style from "./productTop.module.css";
import Image from "next/image";

export default function ProductTop() {
  return (
    <div>
      <div className={style.imgContainer}></div>
      <div className={style.textContainer}>
        <p>개인 프로필</p>
        <p>한 줄 설명이 들어갈 자리입니다. 길수록 보기 좋을 듯 하군요..</p>
        <p>80,000</p>
      </div>
    </div>
  );
}
