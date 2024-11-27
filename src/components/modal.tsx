"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: ReactNode;
  width?: string; // 기본값 설정 가능
  type?: "redirect" | "custom";
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  children,
  width = "80%",
  type = "redirect",
  setModalState,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleClose = () => {
    if (type === "redirect") {
      router.back();
    } else if (setModalState) {
      setModalState(false);
    }
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
      className={style.modal}
      ref={dialogRef}
      style={{ width }}
    >
      {children}
    </dialog>
  );
}
