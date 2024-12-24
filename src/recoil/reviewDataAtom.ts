import { atom } from "recoil";

export const reservationDataState = atom({
  key: "reservationDataState", // 고유한 key 값
  default: {
    id: 0,
    productName: "",
    productImage: "",
    productPrice: 0,
  },
});
