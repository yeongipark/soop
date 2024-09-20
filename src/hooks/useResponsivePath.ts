import { useEffect, useState } from "react";

// 화면 크기에 따라 적절한 path 값을 반환하는 함수
const getPathD = (screenWidth: number): string => {
  if (screenWidth > 600) return `m344.5.4-335 490`;
  const baseWidth = 600; // 기준 너비
  const baseValue = 344.5; // 600px일 때의 path 값
  const baseYValue = 470;

  // 화면 너비가 600px 이상일 경우에는 기본값, 600px 이하일 경우에는 10px당 10씩 줄어듭니다.
  const adjustedValue = baseValue - (baseWidth - screenWidth) * 0.8;

  const y = baseYValue + (baseWidth - screenWidth) * 0.8;
  return `m${adjustedValue} 0.4 -330 ${y}`; // 화면 크기에 따른 pathD 계산

  // // 최소 화면 너비 350px로 제한
  // if (screenWidth < 350) {
  //   return `m0 0.4 -300 490`; // 350px 이하일 때는 최소값
  // }

  return `m${adjustedValue} 0.4 -330 490`;
};

// 커스텀 훅: 화면 크기에 따라 pathD 값을 동적으로 업데이트
export const useResponsivePath = () => {
  const [pathD, setPathD] = useState(getPathD(window.innerWidth)); // 초기값 설정

  useEffect(() => {
    const updatePathD = () => {
      const screenWidth = window.innerWidth;
      setPathD(getPathD(screenWidth)); // 화면 크기에 따라 pathD 설정
    };

    // 초기 설정 및 resize 이벤트 리스너 추가
    window.addEventListener("resize", updatePathD);
    updatePathD(); // 컴포넌트 마운트 시 한 번 실행

    return () => {
      window.removeEventListener("resize", updatePathD); // cleanup
    };
  }, []);

  return pathD;
};
