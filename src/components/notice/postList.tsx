"use client";

import Post from "./post";
import Pagination from "./pagination";
import { paginationNumber } from "@/recoil/paginationAtom";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/util/axios";

interface PostType {
  content: string;
  id: number;
  title: string;
}

async function fetchPosts(page: number) {
  const { data } = await apiClient.get(`/api/notices?page=${page}`);
  return data;
}

export default function PostList() {
  const [page, setPage] = useRecoilState(paginationNumber);

  // React Query를 이용해 데이터 가져오기
  const { data } = useQuery({
    queryKey: ["notices", page], // 쿼리 키 (페이지 번호에 따라 데이터 캐싱됨)
    queryFn: () => fetchPosts(page - 1), // 데이터 fetch 함수
    retryOnMount: false,
  });

  return (
    <div>
      {data?.notices?.map((post: PostType) => (
        <Post key={post.id} title={post.title} id={post.id} />
      ))}
      <Pagination
        totalPage={data?.totalPages ?? 1}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
