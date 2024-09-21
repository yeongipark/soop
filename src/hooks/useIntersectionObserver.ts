import { useEffect, useRef } from "react";

export const useIntersectionObserver = (
  callback: () => void,
  options = { threshold: 0.5 }
) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        callback(); // 뷰포트에 요소가 들어오면 콜백 함수 실행
        observer.unobserve(entry.target); // 실행 후 관찰 중지
      }
    }, options);

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [callback, options]); // 의존성 배열에 callback과 options 추가

  return elementRef;
};
