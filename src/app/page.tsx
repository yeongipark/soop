"use client";
import Logo from "@/components/home/logo";
import {
  FirstImageComponent,
  SecondImageComponent,
  ThirdImageComponent,
  FourthImageComponent,
} from "@/components/home/imageComponent";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import style from "./page.module.css";
import { ReserveButton } from "@/components/home/logo";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Home() {
  // 텍스트 애니메이션 처리 함수
  const handleTextAnimation = () => {
    setTimeout(() => {
      const textElement = document.querySelector(`.${style.lastText} p`);
      const textContent = "당신의 소중한 순간을 사진으로 영원히 담아드립니다.";
      let index = 0;

      for (let char of textContent) {
        const span = document.createElement("span");

        // 공백 처리
        if (char === " ") {
          span.innerHTML = "&nbsp;";
        } else {
          span.textContent = char;
        }

        span.style.animationDelay = `${index++ * 0.1}s`; // 각 글자마다 지연시간 설정
        textElement!.appendChild(span);
      }
    }, 1200);
  };

  // IntersectionObserver로 감지 후 애니메이션 실행
  const textRef = useIntersectionObserver(handleTextAnimation, {
    threshold: 0.5,
  });

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <div>
      <Logo />
      <FirstImageComponent />
      <SecondImageComponent />
      <ThirdImageComponent />
      <FourthImageComponent />
      <div className={style.lastText} data-aos="fade-up">
        <p ref={textRef}></p>
        <div className={style.reserveButton}>
          <ReserveButton />
        </div>
      </div>
    </div>
  );
}
