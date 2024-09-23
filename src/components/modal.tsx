"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: ReactNode;
  width?: string; // width를 props로 받음 (기본값 설정 가능)
}

export default function Modal({ children, width = "80%" }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return (
    <dialog
      onClose={() => router.back()}
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        if ((e.target as HTMLDialogElement).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
      style={{ width }} // 부모 컴포넌트에서 전달된 width를 적용
    >
      {children}
    </dialog>
  );
}
