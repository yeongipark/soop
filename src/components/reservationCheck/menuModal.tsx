import style from "./menuModal.module.css";

export default function MenuModal() {
  return (
    <div className={style.container}>
      <button>문의하기</button>
      <button>예약번호 복사</button>
      <button>예약 취소하기</button>
    </div>
  );
}
