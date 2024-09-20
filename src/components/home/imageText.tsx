import style from "./imageText.module.css";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

export default function ImageText({
  src,
  alt,
  reverse = false,
  text,
}: {
  src: StaticImageData;
  alt: string;
  reverse: boolean;
  text: ReactNode;
}) {
  return (
    <div
      className={`${style.imageTextContainer} ${reverse ? style.reverse : ""}`}
    >
      <div className={style.image}>
        <Image
          src={src}
          alt={alt}
          layout="responsive"
          width={100}
          height={50}
        />
      </div>
      <div className={style.text}>
        <p>{text}</p>
      </div>
    </div>
  );
}
