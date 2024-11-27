import firstImg from "../../../public/사진1.png";
import secondImg from "../../../public/사진2.png";
import { usePathAnimation } from "@/hooks/usePathAnimation";
import style from "./imageComponent.module.css";
import ImageText from "./imageText";
import { useResponsiveWidth } from "@/hooks/useReposiveWidth";
export const FirstImageComponent = () => {
  const { lineRef, isCircleVisible, divRef } = usePathAnimation();
  const { isBelow600 } = useResponsiveWidth();

  return (
    <div className={style.container}>
      <div data-aos="fade-up" ref={divRef}>
        <ImageText
          src={firstImg}
          alt="첫 번째 사진"
          text={
            <>
              1인 여성 작가가 함께하는 <br />
              자연스러운 야외 스냅
            </>
          }
          reverse={false}
        />
      </div>
      <div className={style.diagonalLine}>
        {isBelow600 || (
          <svg xmlns="http://www.w3.org/2000/svg" width="340" height="601">
            <path
              ref={lineRef}
              d={"m310.5 2.4 -298 468"}
              strokeDashoffset={String(lineRef.current?.getTotalLength())}
            />
            <circle
              cx="13"
              cy="469.3"
              r="10"
              className={`${style.circle} ${isCircleVisible ? style.show : ""}`}
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export const SecondImageComponent = () => {
  const { lineRef, isCircleVisible, divRef } = usePathAnimation();
  const { isBelow600 } = useResponsiveWidth();

  return (
    <div className={style.container}>
      <div data-aos="fade-up" ref={divRef}>
        <ImageText
          src={secondImg}
          alt="두 번째 사진"
          text={
            <>
              각각의 고유한 <br />
              분위기를 담아요✧･ﾟ:*🦋
            </>
          }
          reverse={true}
        />
      </div>
      <div className={style.diagonalLine}>
        {isBelow600 || (
          <svg xmlns="http://www.w3.org/2000/svg" width="340" height="601">
            <path
              ref={lineRef}
              stroke="white"
              d={"M0.410436 10 L305.41 460.714"}
            />
            <circle
              cx="305.41"
              cy="460"
              r="10"
              className={`${style.circle} ${isCircleVisible ? style.show : ""}`}
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export const ThirdImageComponent = () => {
  const { lineRef, isCircleVisible, divRef } = usePathAnimation();
  const { isBelow600 } = useResponsiveWidth();
  return (
    <div className={style.container}>
      <div data-aos="fade-up" ref={divRef}>
        <ImageText
          src={firstImg}
          alt="세 번째 사진"
          text={
            <>
              단순한 사진을 넘어,
              <br />
              개성과 감정을 <br />
              세밀하게 포착하는
            </>
          }
          reverse={false}
        />
      </div>
      <div className={style.diagonalLine}>
        {isBelow600 || (
          <svg xmlns="http://www.w3.org/2000/svg" width="340" height="501">
            <path ref={lineRef} stroke="white" d="m310.5 10 -300 443" />
            <circle
              cx="14"
              cy="449.3"
              r="10"
              className={`${style.circle} ${isCircleVisible ? style.show : ""}`}
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export const FourthImageComponent = () => {
  return (
    <div className={style.container}>
      <div data-aos="fade-up">
        <ImageText
          src={secondImg}
          alt="네 번째 사진"
          text={
            <>
              리빈과 함께 <br />
              당신만의 <br />
              특별한 순간을 <br />
              새롭게 풀어내 보세요.
            </>
          }
          reverse={true}
        />
      </div>
    </div>
  );
};
