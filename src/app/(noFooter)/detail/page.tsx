"use client";

import { useRecoilState } from "recoil";
import { productIdState } from "@/recoil/productIdAtom";

import ClientProductPage from "./clientProductPage";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert";

export default function ProductPage() {
  const router = useRouter();

  const [id] = useRecoilState(productIdState);

  if (!id) {
    return (
      <Alert
        title="잘못된 접근입니다. 다시 시도해주세요."
        setModalState={() => router.replace("/product")}
      />
    );
  }

  return <ClientProductPage id={String(id)} />;
}
