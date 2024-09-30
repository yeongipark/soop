"use client";
// 카카오 로그인 처리하는 페이지
import useLogin from "@/hooks/useLogin";

export default function Page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  useLogin("kakao", searchParams.code);

  return <div>로그인 진행중입니다. 잠시만 기다려 주세요.</div>;
}
