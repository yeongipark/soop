"use client";

import apiClient from "@/util/axios";
import style from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { ReservationStatusTypeKey } from "@/types";
import Alert from "@/components/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReservationStatusType } from "@/constants/reservationStatusType";
import { ReservationStatus } from "@/components/reservationCheck/card";
import { useState } from "react";
import ProtectedPage from "@/components/protectedPage";

export default function Page({ params }: { params: { id: string } }) {
  const [reservationStateAlert, setReservationStateAlert] = useState(false);
  const [canChangeAlert, setCanChangeAlert] = useState(false);

  const router = useRouter();
  const id = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservationId", id],
    queryFn: () => getReservationData(id),
  });

  if (isLoading) return "로딩중...";

  if (error)
    return (
      <Alert
        title="잘못된 접근입니다. 다시 시도해주세요."
        setModalState={() => router.back()}
      />
    );

  return (
    <ProtectedPage>
      <div className={style.container}>
        <p className={style.title}>{ReservationStatus[data!.status].title}</p>
        <div className={style.infoWrap}>
          <Link href={`/detail/${data?.productInfo.id}`}>
            <p className={style.date}>
              <p className={style.productName}>{data?.productInfo.name}</p>
              <p className={style.shootDate}>
                촬영일
                <br />
                {data?.shootDate} {data?.time.slice(0, 5)}
              </p>
            </p>
          </Link>
          <p className={style.infoTitle}>예약 정보</p>
          <div className={style.infoTable}>
            <table>
              <tbody>
                <tr>
                  <td>예약 번호</td>
                  <td>{data?.code}</td>
                </tr>
                <tr>
                  <td>예약자 이름</td>
                  <td>{data?.name}</td>
                </tr>
                <tr>
                  <td>전화번호</td>
                  <td>{data?.phone}</td>
                </tr>
                <tr>
                  <td
                    className={style.info}
                    onClick={() => setReservationStateAlert(true)}
                  >
                    예약 상태
                  </td>
                  <td>{ReservationStatusType[data!.status]}</td>
                </tr>
                <tr>
                  <td>인원</td>
                  <td>{data?.peopleCnt}</td>
                </tr>
                <tr>
                  <td>인스타 업로드</td>
                  <td>{data?.isAgreeUpload ? "동의" : "비동의"}</td>
                </tr>
                <tr>
                  <td>요청 사항</td>
                  <td>{data?.notes !== "" ? data?.notes : "요청 사항 없음"}</td>
                </tr>
                <tr>
                  <td
                    className={style.info}
                    onClick={() => setCanChangeAlert(true)}
                  >
                    변경 가능여부
                  </td>
                  <td>{data?.canChange ? "변경 가능" : "변경 불가"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={style.line}></div>
          <p className={style.infoTitle}>결제 정보</p>
          <div className={style.priceTable}>
            <table>
              <tbody>
                <tr>
                  <td>{data?.productInfo.name}</td>
                  <td>{data?.productInfo.price.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>인원 추가비용</td>
                  <td>{data?.productInfo.additionalFee.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <div className={style.line} style={{ margin: "0.6rem 0rem" }}></div>
            <table>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold" }}>예약금</td>
                  <td style={{ fontWeight: "bold" }}>
                    {data?.productInfo.deposit.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>촬영 후 결제 금액</td>
                  <td style={{ fontWeight: "bold" }}>
                    {(
                      data!.totalPrice - data!.productInfo.deposit
                    ).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>총 금액</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>
                    {data?.totalPrice.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {reservationStateAlert && (
          <Alert
            title="예약 상태"
            type="info"
            subTitle={
              <span>
                예약금 입금 후 반드시
                <br /> 예약 내역 페이지에서{" "}
                <span className={style.text}>
                  입금 계좌 확인 {">"} 입금 확인 요청
                </span>
                버튼을 눌러주세요.
              </span>
            }
            setModalState={setReservationStateAlert}
          />
        )}
        {canChangeAlert && (
          <Alert
            title="예약 변경"
            type="info"
            subTitle={
              <span>
                예약 변경은 기간 내 한번 가능하며
                <br />
                촬영 당일에는 변경할 수 없습니다.
              </span>
            }
            setModalState={setCanChangeAlert}
          />
        )}
      </div>
    </ProtectedPage>
  );
}

async function getReservationData(id: string): Promise<ReservationDetail> {
  const data = await apiClient.get(`/api/reservations/${id}`);
  return data.data;
}

interface Product {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  deposit: number;
  additionalFee: number;
}

interface ReservationDetail {
  id: number;
  code: string;
  shootDate: string; // ISO 8601 형식의 날짜 문자열
  time: string;
  name: string;
  phone: string;
  status: ReservationStatusTypeKey;
  peopleCnt: number;
  isAgreeUpload: boolean;
  notes: string;
  canChange: boolean;
  productInfo: Product;
  totalPrice: number;
}
