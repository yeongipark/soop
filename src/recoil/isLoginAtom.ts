import { getToken } from "@/util/cookie";
import { atom } from "recoil";

export const isLoginState = atom({
  key: "isLoing",
  default: getToken() ? true : false,
});
