import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { productNavHeightState } from "@/recoil/productNavHeightAtom";

// 상품 페이지에서 내비게이션 (info, review) 클릭시 이동 시키는 함수 만드는 커스텀 훅
export default function useProductNav() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [heights, setHeights] = useRecoilState(productNavHeightState);

  // div의 offsetTop을 전역 상태로 설정
  useEffect(() => {
    if (divRef?.current) {
      setHeights((prev) => new Set(prev).add(divRef.current!.offsetTop));
    }
  }, [divRef, setHeights]);

  // 스크롤 함수 정의
  const handleInfoClick = () => {
    const heightArray = Array.from(heights);
    const firstNavHeight = heightArray[0];
    if (firstNavHeight !== undefined) {
      window.scrollTo({
        top: firstNavHeight - 80,
        behavior: "smooth",
      });
    }
  };

  const handleReviewClick = () => {
    const heightArray = Array.from(heights);
    const secondNavHeight = heightArray[1];
    if (secondNavHeight !== undefined) {
      window.scrollTo({
        top: secondNavHeight - 80,
        behavior: "smooth",
      });
    }
  };

  return { divRef, handleInfoClick, handleReviewClick };
}