"use client";

import Card from "@/components/reservationCheck/card";
import style from "./page.module.css";
import ReservationCheckNav from "@/components/reservationCheck/reservationCheckNav";
import Modal from "@/components/modal";
import DepositModal from "@/components/reservationCheck/depositModal";
import MenuModal from "@/components/reservationCheck/menuModal";

import { useState } from "react";

export default function Page() {
  const [depositModal, setDepositModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);

  return (
    <div>
      {depositModal && (
        <Modal type="custom" setModalState={setDepositModal}>
          <DepositModal />
        </Modal>
      )}
      {menuModal && (
        <Modal type="custom" setModalState={setMenuModal}>
          <MenuModal />
        </Modal>
      )}
      <p className={style.title}>촬영 예약내역</p>
      <div className={style.content_wrap}>
        <ReservationCheckNav />
        <Card reservationType="CANCELED" />
        <Card reservationType="CONFIRM_REQUESTED" />
        <Card reservationType="PAYMENT_CONFIRMED" />
        <Card reservationType="PENDING_PAYMENT" />
        <Card reservationType="REVIEW_COMPLETED" />
        <Card reservationType="SHOOTING_COMPLETED" />
      </div>
    </div>
  );
}
