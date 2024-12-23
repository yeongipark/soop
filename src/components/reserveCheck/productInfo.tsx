"use client";

import { useRecoilState } from "recoil";
import style from "./productInfo.module.css";
import { reservationState } from "@/recoil/reservationAtom";

export default function ProductInfo({ people }: { people: number }) {
  const [reservationData] = useRecoilState(reservationState);

  const price = reservationData.price;
  const additionFee = reservationData.additionalFee * (people - 1);

  return (
    <section className={style.productInfoContainer}>
      <p className={style.title}>상품 정보</p>
      <div className={style.productWrap}>
        <p className={style.productName}>개인 프로필</p>
        <p className={style.reserveTime}>일정 9.26(목) 오후 12:30</p>
      </div>
      <div className={style.price}>
        <table cellPadding={"3px"}>
          <tbody>
            <tr>
              <td className={style.priceTitle}>개인 프로필</td>
              <td>{price.toLocaleString()}</td>
            </tr>
            <tr>
              <td>인원 추가비용</td>
              <td>{additionFee.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <table cellPadding={"3px"}>
          <tbody>
            <tr>
              <td className={`${style.priceTitle} ${style.bold}`}>예약금</td>
              <td className={style.bold}>10,000</td>
            </tr>
            <tr>
              <td className={`${style.priceTitle} ${style.bold}`}>
                촬영 후 결제 금액
              </td>
              <td className={style.bold}>
                {(price + additionFee - 10000).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className={`${style.priceTitle} ${style.bold}`}>총 금액</td>
              <td className={`${style.bold} ${style.red}`}>
                {" "}
                {(price + additionFee).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
