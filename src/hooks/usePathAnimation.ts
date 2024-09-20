import { useRef, useState, useEffect } from "react";
import style from "@/components/home/imageComponent.module.css";

export const usePathAnimation = () => {
  const lineRef = useRef<SVGPathElement | null>(null); // path 참조
  const [isCircleVisible, setCircleVisible] = useState(false); // circle이 보일지 여부

  useEffect(() => {
    const handlePathAnimation = () => {
      const path = lineRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);

        // Path가 다 그려진 후 circle 표시
        setTimeout(() => {
          setCircleVisible(true);
        }, 1500); // 2초 후 circle 표시
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lineRef.current?.classList.add(style.line); // 선 애니메이션 트리거
          handlePathAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, []);

  return { lineRef, isCircleVisible };
};
