"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import apiClient from "@/util/axios";
import style from "./page.module.css";

const getData = async (id: string) => {
  const { data } = await apiClient(`/api/notices/${id}`);
  return data;
};

interface ClientNoticePageProps {
  id: string;
}

export default function ClientNoticePage({ id }: ClientNoticePageProps) {
  const query = useSearchParams();

  const title = query.get("title") ?? "제목 없음";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notice_detail", id],
    queryFn: () => getData(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>데이터 로드 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.info}>
        <p className={style.title}>{title}</p>
        <p className={style.date}>2024.10.25</p>
      </div>
      <p className={style.content}>{data?.content ?? "내용이 없습니다."}</p>
    </div>
  );
}
