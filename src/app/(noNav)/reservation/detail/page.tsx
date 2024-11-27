import style from "./page.module.css";

export default function Page() {
  return (
    <div className={style.container}>
      <p className={style.title}>입금 확인 요청이 필요해요.</p>
      <div className={style.infoWrap}>
        <p className={style.productName}>개인 프로필 {">"} </p>
        <p className={style.date}>
          촬영일
          <br />
          2024. 09. 23
        </p>
        <p className={style.infoTitle}>예약 정보</p>
        <div className={style.infoTable}>
          <table>
            <tbody>
              <tr>
                <td>예약 번호</td>
                <td>Re20240930ABC</td>
              </tr>
              <tr>
                <td>예약자 이름</td>
                <td>오주은</td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>010-4108-5088</td>
              </tr>
              <tr>
                <td>예약 상태</td>
                <td>
                  입금전&nbsp;&nbsp;&nbsp;
                  <button>확인 요청</button>
                </td>
              </tr>
              <tr>
                <td>인원</td>
                <td>2</td>
              </tr>
              <tr>
                <td>인스타 업로드</td>
                <td>동의</td>
              </tr>
              <tr>
                <td>요청 사항</td>
                <td>
                  연예인처럼 촬영해주세요.
                  <br />
                  감사합니다. 요청사항 들어주세요. 하하ㅏㅅ!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <p className={style.infoTitle}>결제 정보</p>
        <div className={style.priceTable}>
          <table>
            <tbody>
              <tr>
                <td>상품 가격</td>
                <td>70,000</td>
              </tr>
              <tr>
                <td>예약금</td>
                <td>10,000</td>
              </tr>
              <tr>
                <td>촬영 후 결제 금액</td>
                <td>60,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
