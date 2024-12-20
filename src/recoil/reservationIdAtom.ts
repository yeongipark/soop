import { atom } from "recoil";

// 예약 관련 상태를 저장할 Atom
export const reservationIdState = atom({
  key: "reservationIdState", // Atom의 고유 키
  default: 0,
});
