import style from "./info.module.css";

type InfoProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  firstTel: string;
  setFirstTel: React.Dispatch<React.SetStateAction<string>>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
  handleAutoComplete: () => void;
};

export default function Info({
  name,
  setName,
  email,
  setEmail,
  firstTel,
  setFirstTel,
  person,
  setPerson,
  handleAutoComplete,
}: InfoProps) {
  // 숫자만 입력을 허용하는 함수
  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTel: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    setTel(value);
  };

  return (
    <section className={style.infoContainer}>
      <p className={style.title}>예약자 정보</p>
      <div className={style.wrap}>
        <p>성명</p>
        <div className={style.nameInput}>
          <input
            type="text"
            placeholder="성명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={style.wrap}>
        <p>이메일</p>
        <div className={style.emailInput}>
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={style.wrap}>
        <p style={{ width: "60px" }}>연락처</p>
        <div className={style.phoneNumberInput}>
          <input
            type="text"
            value={firstTel}
            onChange={(e) => handlePhoneChange(e, setFirstTel)}
            placeholder="010-****-****"
            maxLength={13}
          />
        </div>
      </div>
      <div className={style.wrap} style={{ marginTop: "0.5rem" }}>
        <p></p>
        <input type="checkbox" id="checkbox" onClick={handleAutoComplete} />
        <label htmlFor="checkbox"> &nbsp; 예약자 정보 자동 입력</label>
      </div>
      <div className={style.wrap}>
        <p>인원</p>
        <div className={style.peopleNumInput}>
          <select
            name="person"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          >
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명</option>
            <option value="6">6명</option>
            <option value="7">7명</option>
          </select>
        </div>
      </div>
    </section>
  );
}
