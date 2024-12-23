import apiClient from "@/util/axios";
import style from "./review.module.css";
import ReviewItem from "./reviewItem";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ReviewsType {
  reviews: Array<{
    reviewId: number;
    nickname: string;
    content: string;
    shootDate: string;
    helpCnt: number;
    isHelped: boolean;
    commentCnt: number;
  }>;
  total: number;
  isLastPage: boolean;
}

async function getReviews(
  productId: string,
  pageParm: number
): Promise<ReviewsType> {
  let res;
  if (pageParm === 0)
    res = await apiClient.get(`/api/products/${productId}/reviews`);
  else
    res = await apiClient.get(
      `/api/products/${productId}/reviews?page=${pageParm}`
    );
  return res.data;
}

export default function Review({ id }: { id: string }) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", id],
      queryFn: ({ pageParam = 0 }) => getReviews(id, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, page) =>
        lastPage && lastPage.reviews.length === 5 ? page.length : undefined,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      retry: 0,
    });

  if (isLoading) return "로딩중...";

  // 모든 리뷰를 하나로 합치기
  const allReviews = data?.pages.reduce(
    (acc, page) => [...acc, ...page.reviews],
    []
  );

  return (
    <div className={style.container}>
      <p className={style.title}>REVIEW ({data?.pages[0].total})</p>
      {data?.pages[0].total === 0 && "등록된 리뷰가 없습니다."}
      {allReviews?.map((review) => (
        <ReviewItem key={review.reviewId} {...review} productId={id} />
      ))}

      {/* "리뷰 더보기" 버튼 */}
      {hasNextPage && (
        <div className={style.button}>
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "로딩 중..." : "리뷰 더보기"}
          </button>
        </div>
      )}
    </div>
  );
}
