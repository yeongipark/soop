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
import Alert from "@/components/alert";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";

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

export default function ClientProductPage({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductData(id),
    refetchOnMount: false,
  });

  const setReservationState = useSetRecoilState(reservationState);

  useEffect(() => {
    if (data) {
      setReservationState((prev) => ({
        ...prev,
        name: data.name,
        thumbnail: data.thumbnail,
        price: parseInt(data.price),
        additionalFee: data.additionalFee,
        productId: data.id,
        productName: data.name,
        deposit: data.deposit,
      }));
    }
  }, [data, setReservationState]);

  if (error) {
    return (
      <Alert
        title="잘못된 접근입니다. 다시 시도해주세요."
        setModalState={() => router.replace("/product")}
      />
    );
  }

  return (
    <div>
      {isLoading ? (
        <Loading text="로딩중.." />
      ) : (
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
            content={data?.description ?? ""}
            images={data?.images ?? []}
          />
          <div>
            <ProductNav info={false} />
          </div>
          <Review id={id} />
        </div>
      )}
    </div>
  );
}
