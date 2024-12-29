"use client";

import { useEffect, useState } from "react";
import style from "./page.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import apiClient from "@/util/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MemberType } from "@/components/myinfo/myinfo";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedPage from "@/components/protectedPage";

async function postPhone(phone: string) {
  const res = await apiClient.patch("/api/member/phone", { phone });
  return res.data;
}

const phoneRegExp = /^\d{3}-\d{4}-\d{4}$/;

export default function Page({
  searchParams,
}: {
  searchParams: { content?: string };
}) {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const data = searchParams.content;

  useEffect(() => {
    if (data) {
      setPhone(data);
    }
  }, []);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (phone: string) => postPhone(phone),
    onMutate: async () => {
      const prevData: MemberType | undefined = queryClient.getQueryData([
        "memberData",
      ]);

      queryClient.setQueryData(["memberData"], (oldData: MemberType) => {
        return { ...oldData, phone };
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
    mutate(phone);
    router.replace("/myinfo");
  };

  const handleDeleteBtn = () => {
    setPhone("");
  };

  return (
    <ProtectedPage>
      <div>
        <div style={{ padding: "0px 10px" }}>
          <p className={style.title}>
            변경할 전화번호를 입력해주세요.(하이픈 포함)
          </p>
          <div className={style.wrap}>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-xxxx-xxxx"
            />
            <TiDeleteOutline className={style.icon} onClick={handleDeleteBtn} />
          </div>
        </div>
        <div className={style.btn}>
          <button
            disabled={!phoneRegExp.test(phone) || phone === data}
            className={`${
              phoneRegExp.test(phone) && phone !== data && style.active
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
