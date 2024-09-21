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

export default function Home() {
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
        <p>당신의 소중한 순간을 사진으로 영원히 담아드립니다.</p>
        <div className={style.reserveButton}>
          <ReserveButton />
        </div>
      </div>
    </div>
  );
}
