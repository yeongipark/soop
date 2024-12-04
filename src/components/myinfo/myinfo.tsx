"use client";

import { useState } from "react";
import style from "./myinfo.module.css";
import { FiAlertCircle } from "react-icons/fi";
import Alert from "../alert";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export interface MemberType {
  name: string;
  phone: string;
  email: string;
  nickname: string;
}

async function getMemberData(): Promise<MemberType> {
  const res = await apiClient.get("/api/member");
  return res.data;
}

export default function MyInfo() {
  const [editMode, setEditMode] = useState(false);
  const [onAlert, setAlert] = useState(false);

  const handleEditModeBtn = () => {
    setEditMode(!editMode);
  };

  const handleEmailInfoBtn = () => {
    setAlert(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
    refetchOnMount: false,
  });

  if (isLoading) return "로딩중입니다..";

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
          {data?.nickname ?? "닉네임을 설정해주세요"}
          <Link href={"/myinfo/change/nickname"}>
            <span className={style.editBtn}> ✍🏻</span>
          </Link>
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
                <td>{data?.name ?? "이름을 설정해주세요"}</td>
                <td>
                  {editMode && (
                    <Link href={"/myinfo/change/name"}>
                      <span className={style.editBtn}>✍🏻</span>
                    </Link>
                  )}
                </td>
              </tr>
              <tr>
                <td>휴대폰 번호</td>
                <td>{data?.phone ?? "전화번호를 설정해주세요!"}</td>
                <td>
                  {editMode && (
                    <Link href={"/myinfo/change/phone"}>
                      <span className={style.editBtn}>✍🏻</span>
                    </Link>
                  )}
                </td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>{data?.email}</td>
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
