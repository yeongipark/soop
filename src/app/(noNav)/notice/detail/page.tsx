"use client";

import ClientNoticePage from "./clientNoticePage";
import { useRecoilState } from "recoil";
import { noticeId } from "@/recoil/noticeIdAtom";

export default function Page() {
  const [id] = useRecoilState(noticeId);

  if (!id) {
    return <div>잘못된 요청입니다. ID가 필요합니다.</div>;
  }

  return <ClientNoticePage id={String(id)} />;
}
