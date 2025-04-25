import { useState } from "react"; // useStateをインポート
import type { JSX } from "react";

export function SubmitButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  const [showPopup, setShowPopup] = useState(false); // ポップアップの表示状態を管理

  const handleClick = () => {
    setShowPopup(true); // ポップアップを表示
    onClick();
  };

  const closePopup = () => {
    setShowPopup(false); // ポップアップを閉じる
  };

  return (
    <div className="relative group inline-block">
      <button
        type="button"
        className="bg-teal-500 px-12 py-2 hover:bg-teal-600 text-white rounded"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center">
          <p>{"できた!"}</p>
        </div>
      </button>

      <div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-auto
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-3 whitespace-nowrap">
          ⌘ + Enter
        </div>
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0
                      border-x-4 border-x-transparent
                      border-t-4 border-t-gray-800"
        ></div>
      </div>

      {/* ポップアップ */}
      {showPopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border-l-4 border-red-500 text-black px-4 py-10 rounded shadow-lg">
          <button
            onClick={closePopup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✖
          </button>
          <strong className="font-bold">テストメッセージ</strong>
          <span className="block sm:inline">
            つまったときはスライドやヒントも確認してみましょう
          </span>
        </div>
      )}
    </div>
  );
}
