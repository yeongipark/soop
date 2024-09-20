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
    </div>
  );
}
