"use client";

import apiClient from "@/util/axios";
import ProductCard from "./productCard";
import style from "./productCardList.module.css";
import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserve } from "@/hooks/useIntersectionObserve";

// Product 타입 정의
interface ProductType {
  id: number;
  name: string;
  thumbnail: string;
  summary: string;
  price: number;
}

// 상품 정보 가져오는 함수
async function getProducts(pageParam: number) {
  let data;
  if (pageParam)
    data = await apiClient.get(`/api/products?productId=${pageParam}`);
  else data = await apiClient.get(`/api/products`);
  return data.data;
}

export default function ProductCardList() {
  // 무한 스크롤
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam = 0 }) => getProducts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        // 페이지의 마지막 id로 다음 페이지를 결정
        if (lastPage && lastPage.length === 6) {
          return lastPage[lastPage.length - 1]?.id;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      retry: 0,
    });

  // 감시할 요소 저장할 ref
  const nextFetchTargetRef = useRef<HTMLDivElement>(null);

  // IntersectionObserve 커스텀 훅 가져옴
  useIntersectionObserve({
    ref: nextFetchTargetRef,
    fetchNextPage,
    hasNextPage,
    data,
  });

  // 데이터가 있을 때 2개씩 묶는 함수
  const chunkData = (data: ProductType[]) => {
    const chunked = [];
    for (let i = 0; i < data.length; i += 2) {
      chunked.push(data.slice(i, i + 2));
    }
    return chunked;
  };

  return (
    <div>
      {data?.pages?.flat().length ? (
        chunkData(data.pages.flat() as ProductType[]).map(
          (productPair, index) => (
            <div key={index} className={style.container}>
              {productPair.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  thumbnail={product.thumbnail}
                  summary={product.summary}
                />
              ))}
            </div>
          )
        )
      ) : (
        <p>상품이 없습니다.</p>
      )}

      {isFetchingNextPage && <p>로딩중...</p>}
      {!isFetchingNextPage && hasNextPage && (
        <div ref={nextFetchTargetRef}>더 불러오기</div>
      )}
    </div>
  );
}
