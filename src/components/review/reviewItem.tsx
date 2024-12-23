import style from "./reviewItem.module.css";
import ReviewButton from "./reviewButton";
import Link from "next/link";
import ReviewChatCount from "./reviewChatCount";

export default function ReviewItem({
  reviewId,
  nickname,
  content,
  shootDate,
  helpCnt,
  isHelped,
  commentCnt,
}: {
  reviewId: number;
  nickname: string;
  content: string;
  shootDate: string;
  helpCnt: number;
  isHelped: boolean;
  commentCnt: number;
}) {
  return (
    <div className={style.container}>
      <Link
        href={{
          pathname: `/review/detail/${reviewId}`,
        }}
      >
        <div className={style.title}>
          <p>{nickname}</p>
          <p>{shootDate} 촬영</p>
        </div>
      </Link>

      <div className={style.content}>
        <Link
          href={{
            pathname: `/review/detail/${reviewId}`,
          }}
        >
          <p>{content}</p>
        </Link>
      </div>
      <div className={style.recommend}>
        <ReviewButton
          reviewId={reviewId}
          helpCnt={helpCnt}
          isHelped={isHelped}
        />
        {commentCnt > 0 ? (
          <Link
            href={{
              pathname: `/review/detail/${reviewId}`,
            }}
          >
            <ReviewChatCount commentCnt={commentCnt} />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
