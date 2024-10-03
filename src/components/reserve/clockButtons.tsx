import style from "./clockButtons.module.css";

export default function ClockButtons() {
  return (
    <div className={style.container}>
      <p>오전</p>
      <div>
        <div className={style.buttonWrap}>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
        </div>
      </div>
      <p>오후</p>
      <div>
        <div className={style.buttonWrap}>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
        </div>
        <div className={style.buttonWrap}>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
          <div>
            <button>10:00</button>
          </div>
        </div>
      </div>
    </div>
  );
}
