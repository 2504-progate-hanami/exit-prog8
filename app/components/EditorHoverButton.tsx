import { useState } from "react";
import type { JSX } from "react";
import type { IStandaloneCodeEditor } from "monaco-editor"; // 型をインポート
import { useAtom } from "jotai";
import { editorContentAtom, isSubmitPopupOpenAtom } from "~/atoms"; // editorContentAtomをインポート
import { DiffEditorComponents } from "./DiffEditorComponents"; // DiffEditorComponentsをインポート

let defaultContentFlag = 0;

export function EditorHoverButton({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick,
  mode,
  editorInstance,
}: {
  onClick?: () => void;
  mode: "reset" | "answer";
  editorInstance?: IStandaloneCodeEditor | null;
}): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultContent, setDefaultContent] = useState(""); // 初期値を保持するためのstate
  const [editorContent] = useAtom(editorContentAtom); // 現在のエディター内容を取得
  const [, setIsSubtmitPopupOpen] = useAtom(isSubmitPopupOpenAtom);

  if (defaultContentFlag == 0) {
    setDefaultContent(editorContent);
    defaultContentFlag++;
  }

  const handleResetClick = () => {
    setIsSubtmitPopupOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={`
          flex items-center space-x-2 px-4 py-2 bg-inherit text-white font-bold transition duration-200 w-28
          ${mode === "reset" ? "hover:bg-red-500" : "hover:bg-yellow-500"}
        `}
        onClick={handleResetClick}
      >
        <div className="flex items-center ">
          <span className="h-4 w-4 flex items-center text-xs whitespace-nowrap">
            👀{mode === "reset" ? "リセットする" : "答えを見る"}
          </span>
        </div>
      </button>

      {isModalOpen && mode === "reset" && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center text-black">
            <p>コードをこのページの最初の状態にリセットしますか？</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                onClick={() => {
                  editorInstance?.setValue(defaultContent); // ここで設定している値にリセット
                  closeModal();
                }}
              >
                リセットする
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && mode === "answer" && (
        <DiffEditorComponents onClose={closeModal} />
      )}
    </>
  );
}
