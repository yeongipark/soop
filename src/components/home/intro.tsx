"use client";

import {
  FirstImageComponent,
  SecondImageComponent,
  ThirdImageComponent,
  FourthImageComponent,
} from "@/components/home/imageComponent";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import style from "./home.module.css";
import { ReserveButton } from "@/components/home/logo";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Intro() {
  // 텍스트 애니메이션 처리 함수
  const textAnimation = () => {
    const textElement = document.querySelector(`.${style.lastText} p`);
    const text = "당신의 소중한 순간을 사진으로 영원히 담아드립니다.";

    // 각 텍스트의 인덱스를 추적할 변수
    let index = 0;
    for (const char of text) {
      // span 태그 동적으로 생성
      const span = document.createElement("span");

      if (char === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.innerHTML = char;
      }

      // 애내매이션 딜레이를 적용해 글씨마다 나타는 시간 다르게하기
      span.style.animationDelay = `${index++ * 0.1}s`;

      // p 태그에 생성한 span 태그 추가하기
      textElement?.appendChild(span);
    }
  };

  // 커스텀 훅에서 ref 가져오기
  const textRef = useIntersectionObserver(textAnimation);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  return (
    <div className={style.container}>
      <FirstImageComponent />
      <SecondImageComponent />
      <ThirdImageComponent />
      <FourthImageComponent />
      <div ref={textRef} className={`${style.lastText}`} data-aos="fade-up">
        <p></p>
        <div className={style.reserveButton}>
          <ReserveButton />
        </div>
      </div>
    </div>
  );
}
