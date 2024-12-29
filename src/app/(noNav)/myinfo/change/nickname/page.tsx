"use client";

import { useEffect, useState } from "react";
import style from "./page.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import apiClient from "@/util/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MemberType } from "@/components/myinfo/myinfo";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedPage from "@/components/protectedPage";

async function postNickname(nickname: string) {
  const res = await apiClient.patch("/api/member/nickname", { nickname });
  return res.data;
}

export default function Page({
  searchParams,
}: {
  searchParams: { content?: string };
}) {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const data = searchParams.content;

  useEffect(() => {
    if (data) {
      setNickname(data);
    }
  }, []);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (nickname: string) => postNickname(nickname),
    onMutate: async () => {
      const prevData: MemberType | undefined = queryClient.getQueryData([
        "memberData",
      ]);

      queryClient.setQueryData(["memberData"], (oldData: MemberType) => {
        return { ...oldData, nickname };
      });

      return { prevData };
    },
    onError: (context: any) => {
      if (context?.prevData) {
        queryClient.setQueryData(["memberData"], context?.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["memberData"]);
    },
  });

  const handleSaveBtn = () => {
    mutate(nickname);
    router.replace("/myinfo");
  };

  const handleDeleteBtn = () => {
    setNickname("");
  };

  return (
    <ProtectedPage>
      <div>
        <div style={{ padding: "0px 10px" }}>
          <p className={style.title}>변경할 닉네임을 입력해주세요.</p>
          <div className={style.wrap}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TiDeleteOutline className={style.icon} onClick={handleDeleteBtn} />
          </div>
        </div>
        <div className={style.btn}>
          <button
            disabled={nickname.length < 2 || nickname === data}
            className={`${
              nickname.length >= 2 && nickname !== data && style.active
            }`}
            onClick={handleSaveBtn}
          >
            저장하기
          </button>
        </div>
      </div>
    </ProtectedPage>
  );
}
