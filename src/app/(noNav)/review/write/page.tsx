"use client";

import Image from "next/image";
import style from "./page.module.css";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState("");
  const params = useSearchParams();

  // 최대 글자 수 제한
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 500) {
      setContent(newValue);
    }
  };

  return (
    <div>
      <p className={style.title}>리뷰 작성</p>
      <div className={style.wrap}>
        <div className={style.imgWrap}>
          <Image
            src="/프로필사진.jpg" // 이미지 경로
            alt="개인 프로필"
            layout="fill" // 부모 요소를 기준으로 꽉 채움
          />
        </div>
        <div className={style.infoWrap}>
          <p className={style.productName}>프로필 사진</p>
          <p className={style.productPrice}>80,000</p>
        </div>
      </div>
      <p className={style.subTitle}>촬영은 어떠셨나요?</p>
      <div className={style.textareaWrap}>
        <textarea
          value={content}
          onChange={handleChange} // 변경된 핸들러
          placeholder="최소 10자 이상 작성해주세요:)"
        ></textarea>
        <p className={style.textLength}>{`${content.length}/500`}</p>
      </div>
      <div className={style.btnWrap}>
        <button
          disabled={content.length < 10}
          className={`${content.length >= 10 && style.active}`}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
