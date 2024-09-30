"use client";
import useLogin from "@/hooks/useLogin";

export default function Page({
  params,
  searchParams,
}: {
  params: { provider: string };
  searchParams: { code: string };
}) {
  useLogin(params.provider, searchParams.code);

  return <div>로그인 진행중입니다. 잠시만 기다려주세요.</div>;
}
