import React from "react";

type HomeButtonProps = {
  detail: string;
  onC: () => void;
  className?: string; // className をオプショナルな prop として定義
};

export function HomeButton({ detail, onC, className }: HomeButtonProps) {
  return (
    <button
      onClick={onC}
      className={`bg-[#2b546a] text-white font-bold py-2 px-4 ${className}`} // 渡された className を既存の className に追加
    >
      {detail}
    </button>
  );
}
