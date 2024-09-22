import { useRef, useState, useEffect } from "react";
import style from "@/components/home/imageComponent.module.css";
import { useRecoilState } from "recoil";
import { isBelow600State } from "@/recoil/isBelow600Atom";

export const usePathAnimation = () => {
  const lineRef = useRef<SVGPathElement | null>(null); // path 참조
  const [isCircleVisible, setCircleVisible] = useState(false); // circle이 보일지 여부
  const [isBelow600, setIsBelow600] = useRecoilState(isBelow600State); // 현재 너비가 600px 이하인지 상태 저장

  // isBelow600이 바뀔 때만 실행
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const isNowBelow600 = currentWidth < 600;

      // 이전 상태와 비교하여 600px 이상/이하로 변화할 때만 상태 업데이트
      if (isNowBelow600 !== isBelow600) {
        setIsBelow600(isNowBelow600);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isBelow600]);

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
        }, 1300);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handlePathAnimation();
          lineRef.current?.classList.add(style.line); // 선 애니메이션 트리거
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
  }, [isBelow600]); // isBelow600이 바뀔 때만 애니메이션 실행

  return { lineRef, isCircleVisible };
};
