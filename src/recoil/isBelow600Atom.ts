import { atom } from "recoil";

// 화면이 600px 이하로 줄었는 지 확인하는 변수
export const isBelow600State = atom({
  key: "isBelow600",
  default: false,
});
