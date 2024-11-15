"use client";

import style from "./nextButton.module.css";

interface NextButtonProps {
  isEnabled: boolean;
  onClick: () => void;
  label: string;
}

export default function NextButton({
  isEnabled,
  onClick,
  label,
}: NextButtonProps) {
  return (
    <div className={style.nextBtn}>
      <button
        className={isEnabled ? style.possibleBtn : style.impossibleBtn}
        onClick={onClick}
        disabled={!isEnabled}
      >
        {label}
      </button>
    </div>
  );
}
