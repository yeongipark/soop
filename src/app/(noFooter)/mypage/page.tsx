import style from "./page.module.css";

export default function Page() {
  return (
    <div>
      <p className={style.title}>
        오주은님, 💁
        <br />
        반갑습니다.
      </p>
      <div className={style.menuWrap}>
        <div className={style.menu}>
          <p>PROFILE</p>
          <p>고객님의 개인정보를 관리하는 곳입니다.</p>
        </div>
        <a href="/reservation/check">
          <div className={style.menu}>
            <p>RESERVE</p>
            <p>고객님의 예약내역을 조회하는 곳입니다.</p>
          </div>
        </a>
        <div className={style.menu}>
          <p>REVIEW</p>
          <p>고객님의 리뷰를 관리하는 곳입니다.</p>
        </div>
        <div className={style.menu}>
          <p>MILEAGE</p>
          <p>고객님의 적립금를 확인하는 곳입니다.</p>
        </div>
      </div>
    </div>
  );
}
