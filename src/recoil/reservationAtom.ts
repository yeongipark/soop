import { atom } from "recoil";

// 예약 관련 상태를 저장할 Atom
export const reservationState = atom({
  key: "reservationState", // Atom의 고유 키
  default: {
    price: 0, // 가격
    additionalFee: 0, // 추가 요금
    timeSlotId: null as number | null, // 선택된 시간 슬롯 ID
    productId: null as number | null, // 선택된 제품 ID
  },
});
