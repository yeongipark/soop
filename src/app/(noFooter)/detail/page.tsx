"use client";

import { useRecoilState } from "recoil";
import { productIdState } from "@/recoil/productIdAtom";

import ClientProductPage from "./clientProductPage";

export default function ProductPage() {
  const [id] = useRecoilState(productIdState);
  if (!id) {
    return <div>잘못된 요청입니다. ID가 필요합니다.</div>;
  }

  return <ClientProductPage id={String(id)} />;
}
