import style from "./menuModal.module.css";

export default function MenuModal({
  activeMenu,
  setCanceled,
  setCancelModal,
  setMenuModal,
  setInvalidCancel,
  handleCopy,
  date,
}: {
  handleCopy: () => void;
  activeMenu: string;
  setCanceled: React.Dispatch<React.SetStateAction<boolean>>;
  setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInvalidCancel: React.Dispatch<React.SetStateAction<boolean>>;
  date: string;
}) {
  const handleCancel = () => {
    if (activeMenu === "취소됨") {
      setCanceled(true);
      setMenuModal(false);
      return;
    }

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
      <button
        onClick={() => {
          window.open("https://open.kakao.com/o/sxFtI9Yg", "_blank");
          setMenuModal(false);
        }}
      >
        문의하기
      </button>
      <button onClick={handleCopy}>예약번호 복사</button>
      <button onClick={handleCancel}>예약 취소하기</button>
    </div>
  );
}
