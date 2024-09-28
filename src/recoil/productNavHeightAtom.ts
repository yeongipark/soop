import { atom } from "recoil";

// 전역 상태로 height(offsetTop)를 저장하는 atom
export const productNavHeightState = atom<Set<number>>({
  key: "productNavHeightState",
  default: new Set<number>(),
});
