import style from "./productCotent.module.css";
import Image from "next/image";
export default function ProductContent() {
  return (
    <div className={style.container}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
        eveniet ipsum consequuntur quam consectetur repudiandae odio
        voluptatibus tempora repellat laboriosam, et, dolore at eaque ipsa
        sapiente vel dignissimos. Exercitationem facere tempore minus,
        consequatur animi quae repellat inventore sint qui amet dolorum quidem
        veritatis nihil nesciunt eaque esse dolores dolorem fugit, earum sed hic
        ab. Saepe molestiae possimus itaque beatae. Optio libero ipsum cumque
        eaque! Non eos officia possimus enim, voluptatem illum consectetur
        aspernatur, nam exercitationem quasi recusandae! Reprehenderit
        laudantium illum, saepe sunt pariatur ut sint officia doloremque soluta
        iusto? Veritatis voluptatem nulla iusto quam eveniet quibusdam quas
        itaque consequuntur velit?
      </p>
      <div className={style.imgWrap}>
        <div>
          <Image
            src={"/프로필사진.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/프로필사진.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/프로필사진.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/사진1.png"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
        <div>
          <Image
            src={"/다운로드.jpg"}
            alt="사진"
            width={100}
            height={100}
            layout="intrinsic"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
