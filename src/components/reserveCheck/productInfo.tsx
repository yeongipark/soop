import style from "./productInfo.module.css";

export default function ProductInfo() {
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
              <td>70,000</td>
            </tr>
            <tr>
              <td>인원 추가비용</td>
              <td>0</td>
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
              <td className={style.bold}>60,000</td>
            </tr>
            <tr>
              <td className={`${style.priceTitle} ${style.bold}`}>총 금액</td>
              <td className={`${style.bold} ${style.red}`}>70,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
