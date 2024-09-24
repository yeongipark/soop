"use client";

import { CiSearch } from "react-icons/ci";
import style from "./productSearch.module.css";
import useProductSearchUI from "@/hooks/useProductSearchUI";

export default function ProductSearch() {
  const { inputRef, containerRef, closing, open, handleIconClick } =
    useProductSearchUI();

  return (
    <div ref={containerRef} className={style.container}>
      <div className={style.iconWrap} onClick={handleIconClick}>
        <CiSearch className={style.icon} />
      </div>

      {open && (
        <input
          ref={inputRef}
          type="text"
          className={`${style.input} ${
            closing ? style.inputCollapse : style.inputExpand
          }`}
        />
      )}
    </div>
  );
}
