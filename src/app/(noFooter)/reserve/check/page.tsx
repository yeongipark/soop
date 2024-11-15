"use client";

import Info from "@/components/reserveCheck/info";
import Request from "@/components/reserveCheck/request";
import ProductInfo from "@/components/reserveCheck/productInfo";
import Agree from "@/components/reserveCheck/agree";
import NextButton from "@/components/nextButton";

import { useState } from "react";

export default function Page() {
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
        onClick={() => {}}
        label="예약 하기"
      />
    </article>
  );
}
