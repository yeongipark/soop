import style from "./cardLoading.module.css";

export default function CardLoading() {
  return (
    <div>
      <div className={style.container}>
        <p className={style.title}></p>
        <p className={style.subTitle}></p>
        <div className={style.productWrap}>
          <div className={style.imageContainer}></div>
          <div className={style.info}>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className={style.buttonWrap}></div>
      </div>
      <div className={style.container}>
        <p className={style.title}></p>
        <p className={style.subTitle}></p>
        <div className={style.productWrap}>
          <div className={style.imageContainer}></div>
          <div className={style.info}>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className={style.buttonWrap}></div>
      </div>
      <div className={style.container}>
        <p className={style.title}></p>
        <p className={style.subTitle}></p>
        <div className={style.productWrap}>
          <div className={style.imageContainer}></div>
          <div className={style.info}>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className={style.buttonWrap}></div>
      </div>
    </div>
  );
}
