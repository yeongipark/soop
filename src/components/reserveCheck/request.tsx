import style from "./request.module.css";

type RequestProps = {
  request: string;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
};

export default function Request({ request, setRequest }: RequestProps) {
  return (
    <section className={style.requestContainer}>
      <div className={style.textareaWrap}>
        <textarea
          value={request}
          onChange={(e) => {
            setRequest(e.target.value);
          }}
          placeholder={`업체에 요청하실 내용을 적어주세요.
  
  원하는 시안, 컨셉이 있다면 알려주세요 :)
  참고 링크가 있다면 촬영에 많은 도움이 됩니다!`}
        ></textarea>
      </div>
      <p>
        [예약 전 필독!!!]
        <br />
        <br />
        입금 계좌 : 502-24-19961 오주은
        <br />
        <br />
        당일 임의 취소 및 노쇼하실 경우 다음 예약이 불가능합니다.
        <br />
        <br />
        예약 시간 15분 이상 늦을 시 자동 취소 처리됩니다.
      </p>
    </section>
  );
}
