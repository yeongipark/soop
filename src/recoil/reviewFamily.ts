import { atomFamily } from "recoil";

export const reviewHelpState = atomFamily<number, number>({
  key: "reviewHelpState",
  default: 0, // 초기 값
});

export const reviewIsHelpState = atomFamily<boolean, number>({
  key: "reviewIsHelpState",
  default: false, // 초기 값
});
