import { useRef, useState, useEffect } from "react";
import style from "@/components/home/imageComponent.module.css";

export const usePathAnimation = () => {
  const lineRef = useRef<SVGPathElement | null>(null); // path 참조
  const [isCircleVisible, setCircleVisible] = useState(false); // circle이 보일지 여부
  const [isBelow600, setIsBelow600] = useState(false); // 현재 너비가 600px 이하인지 상태 저장

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const isNowBelow600 = currentWidth < 600;

      // 이전 상태와 비교하여 600px 이상/이하로 변화할 때만 상태 업데이트
      if (isNowBelow600 !== isBelow600) {
        setIsBelow600(isNowBelow600);
      }
    };

    // 윈도우 리사이즈 이벤트 추가
    window.addEventListener("resize", handleResize);

    // 초기 실행: 페이지 로드 시 현재 너비에 맞춰 실행
    handleResize();

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isBelow600]); // isBelow600이 바뀔 때만 실행

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
  }, [isBelow600]); // isBelow600이 바뀔 때만 애니메이션 실행

  return { lineRef, isCircleVisible };
};
