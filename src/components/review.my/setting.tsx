import style from "./setting.module.css";

export default function Setting({
  setModalState,
  handleDeleteBtn,
  handleEditBtn,
}: {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteBtn: () => void;
  handleEditBtn: () => void;
}) {
  return (
    <div className={style.container}>
      <div>
        <button onClick={handleEditBtn}>수정하기</button>
      </div>
      <div>
        <button onClick={handleDeleteBtn}>삭제하기</button>
      </div>
      <p onClick={() => setModalState(false)}>닫기</p>
    </div>
  );
}
