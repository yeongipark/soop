"use client";

import style from "./agree.module.css";

type AgreeProps = {
  instarAgree: boolean;
  personalAgree: boolean;
  useAgree: boolean;
  allAgree: boolean;
  clickInstarAgree: (bool: boolean) => void;
  clickPersonalAgree: (bool: boolean) => void;
  clickUseAgree: (bool: boolean) => void;
  clickAllAgree: (bool: boolean) => void;
};

export default function Agree({
  instarAgree,
  personalAgree,
  useAgree,
  allAgree,
  clickInstarAgree,
  clickPersonalAgree,
  clickUseAgree,
  clickAllAgree,
}: AgreeProps) {
  return (
    <div className={style.container}>
      <div className={style.instar}>
        <p className={style.instar_title}>
          최종보정본은 작가의 포트폴리오로 인스타그램에 업로드 될 수 있습니다.
        </p>
        <p className={style.checkbox}>
          <input
            id="instarAgree"
            type="checkbox"
            checked={instarAgree}
            onChange={() => clickInstarAgree(!instarAgree)}
          />
          <label htmlFor="instarAgree"> 동의합니다.</label>
        </p>
        <p className={style.checkbox}>
          <input
            id="instarNotAgree"
            type="checkbox"
            checked={!instarAgree}
            onChange={() => clickInstarAgree(false)}
          />
          <label htmlFor="instarNotAgree"> 동의하지 않습니다.</label>
        </p>
      </div>

      <div className={style.condition}>
        <p className={style.checkbox}>
          <input
            id="personal"
            type="checkbox"
            checked={personalAgree}
            onChange={() => clickPersonalAgree(!personalAgree)}
          />
          <label htmlFor="personal">
            개인정보 수집 및 이용에 동의합니다. (필수)
          </label>
        </p>
        <div className={style.content}>
          1. 수집하는 개인정보 항목 - 이름, 연락처(전화번호, 이메일 주소),
          <br />
          생년월일, 주소 2. 개인정보 수집 및 이용 목적- 회원 가입 및 서비스 제공
          - 마케팅 및 광고 활용
        </div>
      </div>

      <div className={style.condition}>
        <p className={style.checkbox}>
          <input
            id="use"
            type="checkbox"
            checked={useAgree}
            onChange={() => clickUseAgree(!useAgree)}
          />
          <label htmlFor="use">이용 약관에 동의합니다. (필수)</label>
        </p>
        <div className={style.content}>
          1. 수집하는 개인정보 항목 - 이름, 연락처(전화번호, 이메일 주소),
          <br />
          생년월일, 주소 2. 개인정보 수집 및 이용 목적- 회원 가입 및 서비스 제공
          - 마케팅 및 광고 활용
        </div>
      </div>

      <div className={style.all}>
        <p className={style.checkbox}>
          <input
            id="all"
            type="checkbox"
            checked={allAgree}
            onChange={() => clickAllAgree(!allAgree)}
          />
          <label htmlFor="all">
            인스타 업로드, 이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          </label>
        </p>
      </div>
    </div>
  );
}
