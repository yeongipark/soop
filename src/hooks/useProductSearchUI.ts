import { useRef, useState, useEffect } from "react";

export default function useProductSearchUI() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // container를 참조하는 ref
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // 돋보기 아이콘 클릭할 때 실행할 함수
  const handleIconClick = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 500);
    } else {
      setOpen(true);
      console.log(inputRef);
    }
  };

  // open이 true가 되면 input에 focus
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]); // open 상태가 변경될 때마다 실행

  //container 외부를 클릭했을 때 input을 닫는 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setClosing(true);
        setTimeout(() => {
          setOpen(false);
          setClosing(false);
        }, 500);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return { inputRef, containerRef, closing, open, handleIconClick };
}
