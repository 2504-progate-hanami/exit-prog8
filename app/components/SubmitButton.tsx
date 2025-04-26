import { useAtom } from "jotai"; // jotaiのuseAtomを追加
import type { JSX } from "react";
import { useEffect, useState } from "react"; // useEffectを追加
import {
  checkStateAtom,
  problemAtom,
  isSubmitPopupOpenAtom,
  activeAnomalyAtom,
} from "~/atoms"; // checkStateAtomをインポート
import { Link } from "react-router-dom";

export function SubmitButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  const [isSubmitPopupOpen, setIsSubtmitPopupOpen] = useAtom(
    isSubmitPopupOpenAtom,
  );
  const [checkState] = useAtom(checkStateAtom);
  const [activeAnomaly] = useAtom(activeAnomalyAtom);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [problem] = useAtom(problemAtom);

  // チェック状態が変わったときにポップアップを表示する
  useEffect(() => {
    if (checkState.status === "success" || checkState.status === "error") {
      setIsSubtmitPopupOpen(true);
      setPopupMessage(checkState.message);
      setIsSuccess(checkState.status === "success");
    }
  }, [checkState]);

  const handleClick = () => {
    onClick();
  };

  const closePopup = () => {
    setIsSubtmitPopupOpen(false);
  };

  return (
    <div className="relative group inline-block">
      <button
        type="button"
        className="bg-teal-500 px-12 py-2 hover:bg-teal-600 text-white rounded"
        onClick={handleClick}
        disabled={checkState.status === "checking"}
      >
        <div className="flex items-center justify-center">
          {checkState.status === "checking" ? (
            <p>{"チェック中..."}</p>
          ) : (
            <p>{"できた!"}</p>
          )}
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

      {isSubmitPopupOpen && (
        <div
          className={`fixed bottom-30 left-47/100 transform -translate-x-1/2 bg-white border-l-4 ${isSuccess ? "border-green-500" : "border-red-500"} text-black px-15 py-7 rounded shadow-lg z-50 max-w-md`}
        >
          <button
            onClick={closePopup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✖
          </button>
          <div className="flex items-center mb-2">
            {isSuccess ? (
              <span className="text-green-500 text-2xl mr-2">✅</span>
            ) : (
              <span className="text-red-500 text-2xl mr-2">❌</span>
            )}
            <strong className="font-bold">
              {isSuccess ? "成功！" : "残念！"}
            </strong>
          </div>
          <span className="block sm:inline">{popupMessage}</span>

          {!isSuccess ? (
            <div className="mt-4 pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                ヒント: つまったときはスライドやヒントも確認してみよう🦈
              </p>
            </div>
          ) : (
            <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                onClick={() => {
                  console.log(activeAnomaly);
                }}
              >
                ← 引き返す
              </button>
              <Link
                to={`/problems/${problem?.nextProblemId}`}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-r flex items-center justify-center"
                onClick={() => {
                  // ポップアップを閉じる
                  closePopup();
                }}
              >
                次の問題へ →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
