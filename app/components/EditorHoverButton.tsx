import type { JSX } from "react";

export function EditorHoverButton({
  onClick,
  mode,
}: {
  onClick: () => void;
  mode: "reset" | "answer";
}): JSX.Element {
  const buttonText = mode === "reset" ? "リセットする" : "答えを見る";
  const hoverColorClass =
    mode === "reset" ? "hover:bg-red-500" : "hover:bg-yellow-500";

  return (
    <button
      className={`
        flex items-center space-x-2 px-4 py-2 bg-inherit text-white font-bold transition duration-200 w-28
        ${hoverColorClass}
      `}
      onClick={onClick}
    >
      <div className="flex items-center ">
        <span className="h-4 w-4 flex items-center">👀</span>
        <span className="text-xs whitespace-nowrap">{buttonText}</span>
      </div>
    </button>
  );
}
