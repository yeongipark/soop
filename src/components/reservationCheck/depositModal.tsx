import style from "./depositModal.module.css";

export default function DepositModal() {
  return (
    <div className={style.container}>
      <p className={style.title}>예약금 입금 계좌 안내</p>
      <p className={style.number}>
        28313037982 대구은행 <br />
        박수빈
      </p>
      <p className={style.text}>
        예약금 입금 후 반드시 확인 요청을 눌러주세요.
      </p>

      <div className={style.inputWrap}>
        <input type="text" placeholder="입금자명" />
        <input type="text" placeholder="입금 날짜 (2024. 03. 05)" />
      </div>

      <button className={style.btn}>입금 확인 요청</button>
    </div>
  );
}
