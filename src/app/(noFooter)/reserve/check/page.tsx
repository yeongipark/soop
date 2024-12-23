"use client";

import Info from "@/components/reserveCheck/info";
import Request from "@/components/reserveCheck/request";
import ProductInfo from "@/components/reserveCheck/productInfo";
import Agree from "@/components/reserveCheck/agree";
import NextButton from "@/components/nextButton";
import { useRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/util/axios";
import { useMutation } from "@tanstack/react-query";
import Alert from "@/components/alert";

// 예약 데이터를 서버로 전송하는 함수
async function postReservation(data: any) {
  await apiClient.post("/api/reservations", data);
}

export default function Page() {
  const [reservationData] = useRecoilState(reservationState);
  const router = useRouter();

  // info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstTel, setFirstTel] = useState("");
  const [secondTel, setSecondTel] = useState("");
  const [lastTel, setLastTel] = useState("");
  const [person, setPerson] = useState("1");

  // request
  const [request, setRequest] = useState("");

  // agree
  const [instarAgree, setInstarAgree] = useState(true);
  const [personalAgree, setPersonalAgree] = useState(false);
  const [useAgree, setUseAgree] = useState(false);
  const [allAgree, setAllAgree] = useState(false);

  // 개별 체크박스 상태 변경 함수
  const clickInstarAgree = (bool: boolean) => setInstarAgree(bool);
  const clickPersonalAgree = (bool: boolean) => setPersonalAgree(bool);
  const clickUseAgree = (bool: boolean) => setUseAgree(bool);

  // "모두 동의" 체크박스 클릭 시, 모든 체크박스를 설정하는 함수
  const clickAllAgree = (bool: boolean) => {
    setAllAgree(bool);
    setInstarAgree(bool);
    setPersonalAgree(bool);
    setUseAgree(bool);
  };

  // react-query의 useMutation 훅을 사용하여 서버와 통신
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => postReservation(data),
    onSuccess: () => {
      // 예약 성공 시 완료 페이지로 이동
      router.replace("/complete");
    },
    onError: (error) => {
      console.error("예약 실패:", error);
      alert("예약 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // "예약 하기" 버튼 클릭 시 실행되는 함수
  const clickReserveButton = () => {
    if (isPending) return;
    const data = {
      phone: `${firstTel}${secondTel}${lastTel}`,
      name,
      email,
      notes: request,
      agreeToInstaUpload: instarAgree,
      agreeToPrivacyPolicy: personalAgree && useAgree,
      productId: reservationData.productId,
      timeSlotId: reservationData.timeSlotId,
      peopleCnt: +person,
    };

    mutate(data); // 예약 데이터를 서버로 전송
  };

  // url로 접근하는 거 막음
  if (reservationData.timeSlotId === null)
    return (
      <Alert
        title="잘못된 접근입니다."
        setModalState={() => {
          router.replace("/product");
        }}
      />
    );

  // 모든 필드가 채워져 있을 때만 버튼 활성화
  const isFormValid =
    name &&
    email &&
    firstTel &&
    secondTel &&
    lastTel &&
    person &&
    instarAgree &&
    personalAgree &&
    useAgree &&
    allAgree;

  return (
    <article>
      <Info
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        firstTel={firstTel}
        setFirstTel={setFirstTel}
        secondTel={secondTel}
        setSecondTel={setSecondTel}
        lastTel={lastTel}
        setLastTel={setLastTel}
        person={person}
        setPerson={setPerson}
      />
      <Request request={request} setRequest={setRequest} />
      <ProductInfo />
      <Agree
        instarAgree={instarAgree}
        personalAgree={personalAgree}
        useAgree={useAgree}
        allAgree={allAgree}
        clickInstarAgree={clickInstarAgree}
        clickPersonalAgree={clickPersonalAgree}
        clickUseAgree={clickUseAgree}
        clickAllAgree={clickAllAgree}
      />
      <NextButton
        isEnabled={isFormValid as boolean}
        onClick={clickReserveButton}
        label={isPending ? "예약 중..." : "예약 하기"}
      />
    </article>
  );
}
