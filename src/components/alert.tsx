"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./alert.module.css";
import { FiAlertCircle, FiAlertOctagon } from "react-icons/fi";

interface AlertType {
  children: ReactNode;
  width?: string; // 기본값 설정 가능
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
  type: "info" | "cancel";
}

export default function Alert({
  width = "80%",
  setModalState,
  type,
}: AlertType) {
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
    <dialog className={style.alert} ref={dialogRef} style={{ width }}>
      <div className={style.icon}>
        {type === "info" ? <FiAlertCircle /> : <FiAlertOctagon color="red" />}
      </div>
      <p className={style.title}>예약 상태</p>
      <p className={style.subTitle}>
        예약금 입금 후 반드시 <br />
        예약 내역 페이지에서 입금 계좌 확인 {">"} 입금 확인 요청 버튼을
        눌러주세요.
      </p>
      <button className={style.btn} onClick={handleClose}>
        확인
      </button>
    </dialog>
  );
}
