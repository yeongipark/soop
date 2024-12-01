"use client";

import { useState } from "react";
import style from "./myinfo.module.css";
import { FiAlertCircle } from "react-icons/fi";
import Alert from "../alert";

export default function MyInfo() {
  const [editMode, setEditMode] = useState(true);
  const [onAlert, setAlert] = useState(false);

  const handleEditModeBtn = () => {
    setEditMode(!editMode);
  };

  const handleEmailInfoBtn = () => {
    setAlert(true);
  };

  return (
    <div className={style.container}>
      {onAlert && (
        <Alert
          title="이메일 변경 불가"
          type="info"
          setModalState={setAlert}
          subTitle={
            <>
              이메일은 로그인 시 사용되는 이메일로,
              <br />
              변경이 불가능합니다.
            </>
          }
        />
      )}
      <div className={style.nicknameWrap}>
        <p className={style.icon}>💁</p>
        <p className={style.nickname}>
          딸기모찌붕어빵 <span className={style.editBtn}>✍🏻</span>
        </p>
      </div>
      <div className={style.infoWrap}>
        <div className={style.infoTitle}>
          <p>회원 정보</p>
          <p onClick={handleEditModeBtn}>수정</p>
        </div>
        <div className={style.table}>
          <table>
            <tbody>
              <tr>
                <td>이름</td>
                <td>오주은</td>
                <td>{editMode && <span className={style.editBtn}>✍🏻</span>}</td>
              </tr>
              <tr>
                <td>휴대폰 번호</td>
                <td>010-4108-5088</td>
                <td>{editMode && <span className={style.editBtn}>✍🏻</span>}</td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>jueun1025ffffffffff@naver.com</td>
                <td onClick={handleEmailInfoBtn}>
                  {editMode && <FiAlertCircle className={style.editBtn} />}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
