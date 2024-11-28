"use client";

import { useEffect, useRef } from "react";
import style from "./alert.module.css";
import { FiAlertCircle, FiAlertOctagon } from "react-icons/fi";

interface AlertType {
  width?: string; // 기본값 설정 가능
  type: "info" | "cancel" | undefined;
  title: string;
  subTitle?: React.ReactNode;
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Alert({
  width = "80%",
  setModalState,
  type,
  title,
  subTitle,
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
        {type === "info" && <FiAlertCircle />}
        {type === "cancel" && <FiAlertOctagon color="red" />}
      </div>
      <p className={style.title}>{title}</p>
      <p className={style.subTitle}>{subTitle}</p>
      <button className={style.btn} onClick={handleClose}>
        확인
      </button>
    </dialog>
  );
}
