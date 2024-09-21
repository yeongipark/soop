import { useEffect, useState } from "react";

export const useResponsiveWidth = () => {
  const [isBelow600, setIsBelow600] = useState(false);

  useEffect(() => {
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
