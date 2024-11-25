"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./confirm.module.css";

interface ConfirmType {
  children: ReactNode;
  width?: string; // 기본값 설정 가능
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Confirm({ width = "80%", setModalState }: ConfirmType) {
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
      <p className={style.title}>예약을 취소하시겠습니까?</p>
      <p className={style.subTitle}>
        촬영일 기준
        <br />
        14일 전 90% 환불 <br />
        7일 전~당일 환불 불가
      </p>
      <div className={style.btnWrap}>
        <button className={style.btn} onClick={handleClose}>
          취소
        </button>
        <button className={style.btn} onClick={handleClose}>
          확인
        </button>
      </div>
    </dialog>
  );
}
