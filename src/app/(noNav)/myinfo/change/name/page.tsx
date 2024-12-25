"use client";

import { useEffect, useState } from "react";
import style from "./page.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import apiClient from "@/util/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MemberType } from "@/components/myinfo/myinfo";
import { useRouter } from "next/navigation";
import ProtectedPage from "@/components/protectedPage";
import { useSearchParams } from "next/navigation";

async function postName(name: string) {
  const res = await apiClient.patch("/api/member/name", { name });
  return res.data;
}

export default function Page() {
  const [name, setName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("content");

  useEffect(() => {
    if (data) {
      setName(data);
    }
  }, []);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (name: string) => postName(name),
    onMutate: async () => {
      const prevData: MemberType | undefined = queryClient.getQueryData([
        "memberData",
      ]);

      queryClient.setQueryData(["memberData"], (oldData: MemberType) => {
        return { ...oldData, name };
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
    mutate(name);
    router.replace("/myinfo");
  };

  const handleDeleteBtn = () => {
    setName("");
  };

  return (
    <ProtectedPage>
      <div>
        <div style={{ padding: "0px 10px" }}>
          <p className={style.title}>변경할 이름을 입력해주세요.</p>
          <div className={style.wrap}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TiDeleteOutline className={style.icon} onClick={handleDeleteBtn} />
          </div>
        </div>
        <div className={style.btn}>
          <button
            disabled={name.length < 2 || name === data}
            className={`${name.length >= 2 && name !== data && style.active}`}
            onClick={handleSaveBtn}
          >
            저장하기
          </button>
        </div>
      </div>
    </ProtectedPage>
  );
}
