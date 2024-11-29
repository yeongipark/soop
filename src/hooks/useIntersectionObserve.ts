import { useEffect } from "react";

// ref는 HTMLElement 타입을 참조하는 React.RefObject이어야 합니다.
interface useIntersectionObserveProps {
  ref: React.RefObject<HTMLElement>; // 감시할 DOM 요소를 참조하는 ref
  fetchNextPage: () => void; // 다음 페이지를 가져오는 함수
  hasNextPage: boolean; // 다음 페이지가 있는지 여부
  data: any; // 데이터 (필요에 따라 구체적인 타입으로 변경 가능)
}

// IntersectionObserve 훅
export const useIntersectionObserve = ({
  ref,
  fetchNextPage,
  hasNextPage,
  data,
}: useIntersectionObserveProps) => {
  useEffect(() => {
    const options = {
      root: null, // 뷰포트, Null일 땐 뷰포트는 브라우저창이 기준이 된다.
      rootMargin: "0px",
      threshold: 0.5,
    };

    // entries: IntersectionObserverEntry 객체의 배열
    // observer: IntersectionObserver 인스턴스
    const fetchCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      // 각 항목을 반복하며, 뷰포트와 교차하며 hasNextPage가 true인 경우, fetchNextPage 함수를 호출하고 현재 대상 요소 관찰을 중지!
      entries.forEach((entry) => {
        // entry는 감시중인 요소를 가짐
        // isIntersecting은 해당 요소가 화면에 보일 때 true를 반환함
        // 해당 프로퍼티를 사용하지 않으면 감시중인 요소가 화면에서 사라질때도 실행됨
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage?.();
          observer.unobserve(entry.target);
        }
      });
    };

    // 지정된 fetchCallback과 options 객체를 이용해서 관찰 객체 인스턴스를 새로 생성한다.
    const observer = new IntersectionObserver(fetchCallback, options);

    // ref 객체가 마운트 될 때
    if (ref.current) {
      observer.observe(ref.current);
    }

    // ref 객체가 언마운트 될 때
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [data, fetchNextPage, hasNextPage, ref]); // 의존성 배열에 fetchNextPage, hasNextPage, ref를 추가
};
