import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isBelow600State } from "@/recoil/isBelow600Atom";

export const useResponsiveWidth = () => {
  const [isBelow600, setIsBelow600] = useRecoilState(isBelow600State);

  useEffect(() => {
    // 첫 랜더링시 600px 이하면 true로 변경하기
    if (window.innerWidth < 600) {
      setIsBelow600(true);
    }

    const handleResize = () => {
      setIsBelow600(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isBelow600 };
};
