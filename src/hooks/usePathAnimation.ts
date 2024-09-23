import { useRef, useState, useEffect } from "react";
import style from "@/components/home/imageComponent.module.css";
import { useRecoilState } from "recoil";
import { isBelow600State } from "@/recoil/isBelow600Atom";

export const usePathAnimation = () => {
  const lineRef = useRef<SVGPathElement | null>(null); // path 참조
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isCircleVisible, setCircleVisible] = useState(false); // circle이 보일지 여부
  const [isBelow600, setIsBelow600] = useRecoilState(isBelow600State); // 현재 너비가 600px 이하인지 상태 저장
  const lastScrollY = useRef(0); // 이전 스크롤 위치 저장

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
    const handlePathAnimation = (scrollDirection: string) => {
      const path = lineRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);

        if (scrollDirection === "down") {
          lineRef.current?.classList.remove(style.hideLine); // 선 애니메이션 트리거
          lineRef.current?.classList.add(style.line); // 선 애니메이션 트리거
          // 스크롤이 내려갈 때
          path.style.strokeDashoffset = String(length);

          setTimeout(() => {
            setCircleVisible(true);
          }, 1300);
        } else {
          // 스크롤이 올라갈 때
          lineRef.current?.classList.remove(style.line); // 선 애니메이션 트리거
          lineRef.current?.classList.add(style.hideLine); // 선 애니메이션 트리거

          path.style.transition = "all 1.3s forwards";
          path.style.strokeDashoffset = String(length); // 선이 사라짐
          setCircleVisible(false); // circle 숨기기
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.pageYOffset; // 현재 스크롤 위치
        const scrollDirection =
          currentScrollY > lastScrollY.current ? "down" : "up"; // 스크롤 방향 결정

        if (entry.isIntersecting) {
          handlePathAnimation(scrollDirection);
        } else {
          handlePathAnimation(scrollDirection);
        }

        // 현재 스크롤 위치 업데이트
        lastScrollY.current = currentScrollY;
      },
      { threshold: 0.8 }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, [isBelow600]);

  return { lineRef, isCircleVisible, divRef };
};
