import style from "./menuModal.module.css";

export default function MenuModal({
  setCancelModal,
  setMenuModal,
  setInvalidCancel,
  date,
}: {
  setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInvalidCancel: React.Dispatch<React.SetStateAction<boolean>>;
  date: string;
}) {
  const handleCancel = () => {
    if (new Date(date).getTime() < new Date().getTime()) {
      setMenuModal(false);
      setInvalidCancel(true);
    } else {
      setMenuModal(false);
      setCancelModal(true);
    }
  };

  return (
    <div className={style.container}>
      <button>문의하기</button>
      <button>예약번호 복사</button>
      <button onClick={handleCancel}>예약 취소하기</button>
    </div>
  );
}
