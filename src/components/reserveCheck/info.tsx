import style from "./info.module.css";

type InfoProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  firstTel: string;
  setFirstTel: React.Dispatch<React.SetStateAction<string>>;
  secondTel: string;
  setSecondTel: React.Dispatch<React.SetStateAction<string>>;
  lastTel: string;
  setLastTel: React.Dispatch<React.SetStateAction<string>>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
};

export default function Info({
  name,
  setName,
  email,
  setEmail,
  firstTel,
  setFirstTel,
  secondTel,
  setSecondTel,
  lastTel,
  setLastTel,
  person,
  setPerson,
}: InfoProps) {
  // 숫자만 입력을 허용하는 함수
  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTel: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTel(value);
    }
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
        <div>
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={style.wrap}>
        <p>연락처</p>
        <div className={style.phoneNumberInput}>
          <input
            type="text"
            placeholder="010"
            value={firstTel}
            maxLength={3}
            onChange={(e) => handlePhoneChange(e, setFirstTel)}
          />
          -
          <input
            type="text"
            placeholder="XXXX"
            value={secondTel}
            maxLength={4}
            onChange={(e) => handlePhoneChange(e, setSecondTel)}
          />
          -
          <input
            type="text"
            placeholder="XXXX"
            value={lastTel}
            maxLength={4}
            onChange={(e) => handlePhoneChange(e, setLastTel)}
          />
        </div>
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
