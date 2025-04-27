import { useAtom } from "jotai";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import {
  checkStateAtom,
  problemAtom,
  isSubmitPopupOpenAtom,
  nowProblemNumberAtom,
  nowAnomalyAtom,
  resetEditorConfigAtom,
} from "~/atoms";
import { useNavigate } from "react-router-dom";
import {
  getNowProblemNumber,
  setNowProblemNumber as setSessionProblemNumber,
} from "~/utils/sessionStorage";

export function SubmitButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  const [isSubmitPopupOpen, setIsSubtmitPopupOpen] = useAtom(
    isSubmitPopupOpenAtom,
  );
  const [checkState] = useAtom(checkStateAtom);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [problem] = useAtom(problemAtom);
  const [, setNowProblemNumber] = useAtom(nowProblemNumberAtom);
  const [nowAnomaly] = useAtom(nowAnomalyAtom);
  const [, resetEditorConfig] = useAtom(resetEditorConfigAtom); // 追加：リセット関数
  const navigate = useNavigate();

  const checkCorrect = () => {
    // エディタ設定をリセット
    resetEditorConfig();

    // 異変がある場合はlesson1へリセット
    if (nowAnomaly !== null) {
      // まずポップアップを閉じる
      closePopup();

      // 直接値を1に設定（リセット処理を単純化）
      setSessionProblemNumber(1);
      setNowProblemNumber(1);

      // 新しい値でナビゲート（リロードは不要なので省略）
      navigate(`/problems/lesson1`);
      setTimeout(() => {
        window.location.reload();
      }, 30);
      return;
    }

    // 異変がない場合は次の問題ページに遷移
    if (nowAnomaly === null) {
      // ポップアップを閉じる
      closePopup();

      // 現在の値を取得してインクリメント
      const currentNumber = getNowProblemNumber();
      const nextNumber = currentNumber + 1;

      if (nextNumber == 9) {
        navigate(`/congrat`);
        setTimeout(() => {
          window.location.reload();
        }, 30);
      }

      // 値を更新
      setSessionProblemNumber(nextNumber);
      setNowProblemNumber(nextNumber);

      // 次の問題へ遷移（リロードは不要なので省略）
      navigate(`/problems/${problem?.nextProblemId}`);
      setTimeout(() => {
        window.location.reload();
      }, 30);
    }
  };

  const goBack = () => {
    // エディタ設定をリセット
    resetEditorConfig();

    // 異変がない場合はlesson1へリセット
    if (nowAnomaly == null) {
      // ポップアップを閉じる
      closePopup();

      // 直接値を1に設定
      setSessionProblemNumber(1);
      setNowProblemNumber(1);

      // リセット先に遷移（リロードは不要なので省略）
      navigate(`/problems/lesson1`);
      setTimeout(() => {
        window.location.reload();
      }, 30);
    } else {
      // 異変がある場合は次の問題へ遷移
      closePopup();

      const currentNumber = getNowProblemNumber();

      if (currentNumber == 8) {
        window.location.reload();
        return;
      }

      const nextNumber = currentNumber + 1;

      // 値を更新
      setSessionProblemNumber(nextNumber);
      setNowProblemNumber(nextNumber);

      // 次の問題へ遷移（リロードは不要なので省略）
      navigate(`/problems/${problem?.nextProblemId}`);
      setTimeout(() => {
        window.location.reload();
      }, 30);
    }
  };

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
    <div>
      <div className="relative group inline-block">
        <button
          type="button"
          className="bg-teal-500 px-12 py-2 hover:bg-teal-600 text-white rounded"
          onClick={handleClick}
        >
          できた
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
                  onClick={goBack}
                >
                  ← 引き返す
                </button>
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-r flex items-center justify-center"
                  onClick={() => checkCorrect()}
                >
                  次の問題へ →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
