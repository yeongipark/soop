"use client";

import { useQuery } from "@tanstack/react-query";
import style from "./page.module.css";
import { useSearchParams } from "next/navigation";
import apiClient from "@/util/axios";

const getData = async (id: number) => {
  const { data } = await apiClient(`/api/notices/${id}`);
  return data;
};

export default function Page({ params }: { params: { id: number } }) {
  const query = useSearchParams();

  const title = query.get("title");

  const { data } = useQuery({
    queryKey: ["notice_detail", params.id],
    queryFn: () => getData(params.id),
    refetchOnMount: false,
  });

  return (
    <div className={style.container}>
      <div className={style.info}>
        <p className={style.title}>{title}</p>
        <p className={style.date}>2024.10.25</p>
      </div>
      <p className={style.content}>{data?.content ?? "에러 발생"}</p>
    </div>
  );
}
