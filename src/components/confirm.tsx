"use client";

import { useEffect, useRef } from "react";
import style from "./confirm.module.css";

interface ConfirmType {
  width?: string; // 기본값 설정 가능
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subTitle: React.ReactNode;
  cancel?: string;
  ok?: string;
}

export default function Confirm({
  width = "80%",
  setModalState,
  title,
  subTitle,
  cancel = "취소",
  ok = "확인",
}: ConfirmType) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    if (setModalState) {
      setModalState(false);
    }
  };

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return (
    <dialog className={style.confirm} ref={dialogRef} style={{ width }}>
      <p className={style.title}>{title}</p>
      <p className={style.subTitle}>{subTitle}</p>
      <div className={style.btnWrap}>
        <button className={style.btn} onClick={handleClose}>
          {cancel}
        </button>
        <button className={style.btn} onClick={handleClose}>
          {ok}
        </button>
      </div>
    </dialog>
  );
}
