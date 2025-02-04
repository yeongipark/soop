"use client";

import Info from "@/components/reserveCheck/info";
import Request from "@/components/reserveCheck/request";
import ProductInfo from "@/components/reserveCheck/productInfo";
import Agree from "@/components/reserveCheck/agree";
import NextButton from "@/components/nextButton";
import { useRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/util/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Alert from "@/components/alert";
import ProtectedPage from "@/components/protectedPage";
import Loading from "@/components/loading/loading";

interface MemberData {
  name: string;
  phone: string;
  email: string;
  nickname: string;
}

export default function Page() {
  const [reservationData] = useRecoilState(reservationState);
  const router = useRouter();
  const queryClient = useQueryClient();

  // 자동 완성
  const [autoComplete, setAutoComplete] = useState<boolean>(false);

  // info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstTel, setFirstTel] = useState("");
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

  // `instarAgree`, `personalAgree`, `useAgree`가 모두 true일 경우 `allAgree`를 자동으로 true로 설정
  useEffect(() => {
    if (instarAgree && personalAgree && useAgree && !allAgree) {
      setAllAgree(true);
    }
    if ((!instarAgree || !personalAgree || !useAgree) && allAgree) {
      setAllAgree(false);
    }
  }, [instarAgree, personalAgree, useAgree, allAgree]);

  const { data, isLoading, error } = useQuery<MemberData>({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  const handleAutoComplete = () => {
    if (autoComplete) {
      setAutoComplete(false);
      setName("");
      setEmail("");
      setFirstTel("");
    } else {
      setAutoComplete(true);
      setName(data!.name ?? "");
      setEmail(data!.email ?? "");
      setFirstTel(data!.phone ?? "");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => postReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations", "BEFORE"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["timeSlot"],
        refetchType: "all",
      });
      // 예약 성공 시 완료 페이지로 이동
      router.replace("/complete");
    },
    onError: () => {
      alert("예약 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // "예약 하기" 버튼 클릭 시 실행되는 함수
  const clickReserveButton = () => {
    if (isPending) return;
    const data = {
      phone: firstTel.split("-").join(""),
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
  if (reservationData.timeSlotId === 0)
    return (
      <Alert
        type="cancel"
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
    /^\d{3}-\d{4}-\d{4}$/.test(firstTel) &&
    person &&
    personalAgree &&
    useAgree;

  if (error)
    return (
      <Alert
        type="cancel"
        title="다시 시도해 주세요."
        setModalState={() => {
          router.replace("/product");
        }}
      />
    );

  if (isPending) return <Loading text={"로딩중.."} />;

  return (
    <ProtectedPage>
      {isLoading ? (
        <Loading text={"로딩중.."} />
      ) : (
        <article style={{ padding: "0px 10px" }}>
          <Info
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            firstTel={firstTel}
            setFirstTel={setFirstTel}
            person={person}
            setPerson={setPerson}
            handleAutoComplete={handleAutoComplete}
          />
          <Request request={request} setRequest={setRequest} />
          <ProductInfo people={+person} />
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
            isEnabled={(isFormValid as boolean) || isPending}
            onClick={clickReserveButton}
            label={"예약 하기"}
          />
        </article>
      )}
    </ProtectedPage>
  );
}

// 예약 데이터를 서버로 전송하는 함수
async function postReservation(data: any) {
  await apiClient.post("/api/reservations", data);
}

async function getMemberData(): Promise<MemberData> {
  const res = await apiClient.get("/api/member");
  return res.data;
}
