"use client";

import { usePathAnimation } from "@/hooks/usePathAnimation";
import style from "./imageComponent.module.css";
import ImageText from "./imageText";
import { useResponsiveWidth } from "@/hooks/useReposiveWidth";
export const FirstImageComponent = ({
  image,
  sentence,
}: {
  image: string;
  sentence: string;
}) => {
  const { lineRef, isCircleVisible, divRef } = usePathAnimation();
  const { isBelow600 } = useResponsiveWidth();

  return (
    <div className={style.container}>
      <div data-aos="fade-up" ref={divRef}>
        <ImageText
          src={`https://image.re-bin.kr/rebin/${image}`}
          alt="첫 번째 사진"
          text={<>{sentence}</>}
          reverse={false}
        />
      </div>
      {/* <div className={style.diagonalLine}>
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
      </div> */}
    </div>
  );
};

export const SecondImageComponent = ({
  image,
  sentence,
}: {
  image: string;
  sentence: string;
}) => {
  const { lineRef, isCircleVisible, divRef } = usePathAnimation();
  const { isBelow600 } = useResponsiveWidth();

  return (
    <div className={style.container}>
      <div data-aos="fade-up" ref={divRef}>
        <ImageText
          src={`https://image.re-bin.kr/rebin/${image}`}
          alt="두 번째 사진"
          text={<>{sentence}</>}
          reverse={true}
        />
      </div>
      {/* <div className={style.diagonalLine}>
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
      </div> */}
    </div>
  );
};

export const ThirdImageComponent = ({
  image,
  sentence,
}: {
  image: string;
  sentence: string;
}) => {
  const { lineRef, isCircleVisible, divRef } = usePathAnimation();
  const { isBelow600 } = useResponsiveWidth();
  return (
    <div className={style.container}>
      <div data-aos="fade-up" ref={divRef}>
        <ImageText
          src={`https://image.re-bin.kr/rebin/${image}`}
          alt="세 번째 사진"
          text={<>{sentence}</>}
          reverse={false}
        />
      </div>
      {/* <div className={style.diagonalLine}>
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
      </div> */}
    </div>
  );
};

export const FourthImageComponent = ({
  image,
  sentence,
}: {
  image: string;
  sentence: string;
}) => {
  return (
    <div className={style.container}>
      <div data-aos="fade-up">
        <ImageText
          src={`https://image.re-bin.kr/rebin/${image}`}
          alt="네 번째 사진"
          text={<>{sentence}</>}
          reverse={true}
        />
      </div>
    </div>
  );
};
