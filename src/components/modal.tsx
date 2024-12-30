"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: ReactNode;
  width?: string;
  type?: "redirect" | "custom";
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
  borderRadius?: string;
}

export default function Modal({
  children,
  width = "80%",
  type = "redirect",
  setModalState,
  borderRadius,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // 닫히는 애니메이션 트리거
    setTimeout(() => {
      if (type === "redirect") {
        router.back();
      } else if (setModalState) {
        setModalState(false);
      }
    }, 300); // 애니메이션 지속 시간과 동일하게 설정
  };

  const clickBackground = (e: React.MouseEvent<HTMLDialogElement>) => {
    if ((e.target as HTMLDialogElement).nodeName === "DIALOG") {
      handleClose();
    }
  };

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return (
    <dialog
      onClose={handleClose}
      onClick={clickBackground}
      className={`${style.modal} ${isClosing ? style.hidden : ""}`}
      ref={dialogRef}
      style={{ width, borderRadius }}
    >
      {children}
    </dialog>
  );
}
