"use client";

import { useState } from "react";
import style from "./clockButtons.module.css";
import { useRouter } from "next/navigation";
import NextButton from "../nextButton";

export default function ClockButtons() {
  const router = useRouter();
  const [selectClock, setSelectClock] = useState<string | null>(null);

  // 시간 클릭 핸들러 함수
  const handleOnClockBtn = (clock: string) => {
    setSelectClock(clock);
  };

  // 다음 단계 버튼 핸들러 함수
  const handleOnNextBtn = () => {
    router.push("/reserve/check");
  };

  const am = ["10:00", "10:30", "11:00", "11:30"];
  const pm1 = ["1:00", "1:30", "2:00", "2:30"];
  const pm2 = ["3:00", "3:30", "4:00", "4:30"];
  return (
    <div className={style.container}>
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
        isEnabled={!!selectClock}
        onClick={handleOnNextBtn}
        label="다음 단계"
      />
    </div>
  );
}
