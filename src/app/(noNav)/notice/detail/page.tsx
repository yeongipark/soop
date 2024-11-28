import style from "./page.module.css";

export default function Page() {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <p className={style.title}>📢 예약 전 필독!</p>
        <p className={style.date}>2024.10.25</p>
      </div>
      <p className={style.content}>
        📢 예약 전 필독!
        <br />
        <br />
        촬영 문의는 계정 팔로우 후 카카오톡으로 예약 양식에 맞춰서 보내주세요
        <br />
        촬영은 대구에서 이루어집니다.
        <br /> 주말은 저녁 6시반 이후로 촬영 가능하며 평일은 요일에 따라 가능한
        시간을 알려드립니다
        <br />
        <br /> 예약 양식 성함 촬영 인원 희망 날짜 및 시간(1,2지망) 스튜디오 or
        야외 스냅 원하시는 시안/컨셉 촬영 안내 사항 확인
        <br />
        <br />
        감사합니다 :)
      </p>
    </div>
  );
}
