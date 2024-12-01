"use client";

import ProductTop from "@/components/product/productTop";
import ProductFooter from "@/components/product/productFooter";
import Review from "@/components/review/review";
import ProductContent from "@/components/product/productContent";
import ProductNav from "@/components/product/productNav";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";

interface PageType {
  params: { id: string };
  searchParams: {
    id: string;
    name: string;
    thumbnail: string;
    price: string;
    summary: string;
  };
}

interface ProductType {
  id: number;
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

export default function Page({ params, searchParams }: PageType) {
  const { data, isLoading } = useQuery({
    queryKey: ["productDetail", params.id],
    queryFn: () => getProductData(params.id),
    refetchOnMount: false,
  });

  if (isLoading) return "로딩중...";

  return (
    <div>
      <ProductTop {...searchParams} />
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
