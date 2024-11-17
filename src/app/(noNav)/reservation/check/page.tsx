"use client";

import Card from "@/components/reservationCheck/card";
import style from "./page.module.css";
import ReservationCheckNav from "@/components/reservationCheck/reservationCheckNav";
import Modal from "@/components/modal";
import DepositModal from "@/components/reservationCheck/depositModal";
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
      {depositModal && (
        <Modal type="custom" setModalState={setMenuModal}>
          <DepositModal />
        </Modal>
      )}
      <p className={style.title}>촬영 예약내역</p>
      <div className={style.content_wrap}>
        <ReservationCheckNav />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
