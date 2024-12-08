"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";
import ProductTop from "@/components/product/productTop";
import ProductFooter from "@/components/product/productFooter";
import Review from "@/components/review/review";
import ProductContent from "@/components/product/productContent";
import ProductNav from "@/components/product/productNav";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";

interface PageType {
  params: { id: string };
}

interface ProductType {
  id: number;
  name: string;
  thumbnail: string;
  summary: string;
  price: string;
  description: string;
  images: Array<{
    id: number;
    url: string;
  }>;
  guideLine: string;
  deposit: number;
  additionalFee: number;
  isMemberLike: boolean;
}

async function getProductData(productId: string): Promise<ProductType> {
  const res = await apiClient.get(`/api/products/${productId}`);
  return res.data;
}

export default function Page({ params }: PageType) {
  const { data, isLoading } = useQuery({
    queryKey: ["productDetail", params.id],
    queryFn: () => getProductData(params.id),
    refetchOnMount: false,
  });

  // Atom 상태 업데이트용 Setter 가져오기
  const setReservationState = useSetRecoilState(reservationState);

  // 서버 데이터 Atom에 저장
  useEffect(() => {
    if (data) {
      setReservationState((prev) => ({
        ...prev,
        price: parseInt(data.price), // 서버에서 가져온 price를 Atom에 저장
        additionalFee: data.additionalFee,
        productId: data.id,
      }));
    }
  }, [data, setReservationState]);

  if (isLoading) return "로딩중...";

  return (
    <div>
      <ProductTop
        name={data!.name}
        price={data!.price}
        summary={data!.summary}
        thumbnail={data!.thumbnail}
      />
      <div>
        <ProductNav info={true} />
      </div>
      <ProductFooter liked={data?.isMemberLike ?? false} />
      <ProductContent
        content={data?.guideLine ?? ""}
        images={data?.images ?? []}
      />
      <div>
        <ProductNav info={false} />
      </div>
      <Review id={params.id} />
    </div>
  );
}
