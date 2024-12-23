import style from "./reviewItem.module.css";
import ReviewButton from "./reviewButton";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { reviewIdState } from "@/recoil/reviewIdAtom";
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
  const setReviewId = useSetRecoilState(reviewIdState);
  const onClick = () => {
    setReviewId(reviewId);
  };
  return (
    <div className={style.container}>
      <Link
        href={{
          pathname: "/review/detail",
          query: {
            nickname,
            shootDate,
            content,
            reviewId,
            helpCnt,
            isHelped,
            commentCnt,
          },
        }}
      >
        <div className={style.title} onClick={onClick}>
          <p>{nickname}</p>
          <p>{shootDate} 촬영</p>
        </div>
      </Link>

      <div className={style.content}>
        <Link
          href={{
            pathname: "/review/detail",
            query: {
              nickname,
              shootDate,
              content,
              reviewId,
              helpCnt,
              isHelped,
              commentCnt,
            },
          }}
        >
          <p onClick={onClick}>{content}</p>
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
              pathname: "/review/detail",
              query: {
                nickname,
                shootDate,
                content,
                reviewId,
                helpCnt,
                isHelped,
                commentCnt,
              },
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
