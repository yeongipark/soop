"use client";

import { useEffect, useState } from "react";
import style from "./changeClockButtons.module.css";
import NextButton from "../nextButton";
import Confirm from "../confirm";

export default function ChangeClockButtons({
  basicDate,
  basicClock,
  selectDate,
}: {
  basicDate: string;
  basicClock: string;
  selectDate: string;
}) {
  // selectClock의 초기 상태를 조건에 따라 설정
  const [selectClock, setSelectClock] = useState<string | null>(basicClock);

  const [confirmState, setConfirmState] = useState(false);

  useEffect(() => {
    setSelectClock(() => {
      return basicDate === selectDate ? basicClock : "";
    });
  }, [selectDate]);

  // 시간 클릭 핸들러 함수
  const handleOnClockBtn = (clock: string) => {
    setSelectClock(clock);
  };

  // 변경 하기 함수 핸들러
  const handleOnNextBtn = () => {
    if (!confirmState) {
      setConfirmState(true);
    }
  };

  const am = ["10:00", "10:30", "11:00", "11:30"];
  const pm1 = ["1:00", "1:30", "2:00", "2:30"];
  const pm2 = ["3:00", "3:30", "4:00", "4:30"];

  // NextButton 활성화 조건
  const isNextButtonEnabled =
    (basicDate === selectDate && selectClock !== basicClock) ||
    (basicDate !== selectDate && selectClock !== "");

  return (
    <div className={style.container}>
      {confirmState && (
        <Confirm
          setModalState={setConfirmState}
          title="예약을 변경하시겠습니까?"
          subTitle={
            <>
              변경은 기간 내 한 번만 가능합니다.
              <br />
              <br />
              <br />
              변경 전 날짜: 2024. 09. 23 13:00
              <br />
              <span style={{ color: "red" }}>
                변경 후 날짜: 2024. 09. 27 13:00
              </span>
            </>
          }
          ok="변경"
        />
      )}
      <p>오전</p>
      <div>
        <div className={style.buttonWrap}>
          {am.map((clock) => (
            <div key={clock} className={style.impossibleBtn}>
              <button
                onClick={() => handleOnClockBtn(clock)}
                className={`${selectClock === clock && style.selected}`}
              >
                <p className={style.clockText}>{clock}</p>
                <p className={style.impossible}>예약마감</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <p>오후</p>
      <div className={style.buttons}>
        <div className={style.buttonWrap}>
          {pm1.map((clock) => (
            <div key={clock}>
              <button
                className={`${style.possibleBtn} ${
                  selectClock === clock && style.selected
                }`}
                onClick={() => handleOnClockBtn(clock)}
              >
                <p className={style.clockText}>{clock}</p>
                <p className={style.possible}>예약가능</p>
              </button>
            </div>
          ))}
        </div>
        <div className={style.buttonWrap}>
          {pm2.map((clock) => (
            <div key={clock} className={style.impossibleBtn}>
              <button onClick={() => handleOnClockBtn(clock)}>
                <p className={style.clockText}>{clock}</p>
                <p className={style.impossible}>예약마감</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <NextButton
        isEnabled={isNextButtonEnabled}
        onClick={handleOnNextBtn}
        label="변경 하기"
      />
    </div>
  );
}
