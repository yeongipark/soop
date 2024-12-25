"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/util/axios";
import style from "./page.module.css";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert";
import Loading from "@/components/loading/loading";
import { useEffect, useState } from "react";

const getData = async (id: string) => {
  const { data } = await apiClient(`/api/notices/${id}`);
  return data;
};

interface ClientNoticePageProps {
  id: string;
}

export default function ClientNoticePage({ id }: ClientNoticePageProps) {
  const router = useRouter();
  const [date, setDate] = useState("2025-02-13");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notice_detail", id],
    queryFn: () => getData(id),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data) {
      const shootDate = new Date(data.createdAt);
      const year = shootDate.getFullYear();
      const month = shootDate.getMonth() + 1;
      const date = shootDate.getDate();
      setDate(`${year}.${month}.${date}`);
    }
  }, [data]);

  if (isError) {
    return (
      <Alert
        title="오류가 발생했습니다. 다시 시도해 주세요."
        type="cancel"
        setModalState={() => {
          router.back();
        }}
      />
    );
  }

  return (
    <div className={style.container}>
      {isLoading ? (
        <Loading text="로딩중..." />
      ) : (
        <div>
          <div className={style.info}>
            <p className={style.title}>{data?.title}</p>
            <p className={style.date}>{date}</p>
          </div>
          <p className={style.content}>{data?.content ?? "내용이 없습니다."}</p>
        </div>
      )}
    </div>
  );
}
