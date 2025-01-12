import style from "./imageText.module.css";
import Image from "next/image";
import { ReactNode } from "react";

export default function ImageText({
  src,
  alt,
  reverse = false,
  text,
}: {
  src: string;
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
          style={{ borderRadius: "10px" }}
          src={src}
          alt={alt}
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
      <div className={style.text}>
        <p>{text}</p>
      </div>
    </div>
  );
}
