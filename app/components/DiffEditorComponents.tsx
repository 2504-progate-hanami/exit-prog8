import { DiffEditor, Editor } from "@monaco-editor/react";
import { useAtom } from "jotai";
import { useState, useRef, useEffect } from "react";
import { problemAtom, editorContentAtom, isDiffModeAtom } from "~/atoms";

export function DiffEditorComponents({ onClose }: { onClose?: () => void }) {
  const [problem] = useAtom(problemAtom);
  const [content] = useAtom(editorContentAtom);
  const [, setIsDiffMode] = useAtom(isDiffModeAtom);
  const [showDiff, setShowDiff] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  if (!problem) {
    return <div>問題が読み込まれていません</div>;
  }

  const handleClose = () => {
    setIsDiffMode(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const toggleEditorMode = () => {
    setShowDiff((prev) => !prev);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
    ) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      onClick={handleBackdropClick}
    >
      {/* 閉じるボタン */}
      <button
        onClick={handleClose}
        className="absolute top-23 right-20 z-10 text-gray-400 hover:text-white bg-gray-700 rounded-full p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div
        ref={modalContentRef}
        className="bg-gray-800 p-4 rounded-lg shadow-lg w-10/12 h-4/6 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white text-xl">比較</h2>
            <button
              onClick={toggleEditorMode}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
            >
              自分のコードと見比べてみる
            </button>
          </div>
          <div className="flex-1 w-full border border-gray-600">
            {showDiff ? (
              <div className="flex flex-col h-full">
                <div className="flex bg-gray-700 text-white">
                  <div className="w-1/2 p-2 border-r border-gray-600">
                    自分のコード
                  </div>
                  <div className="w-1/2 p-2">答えのコード</div>
                </div>
                <div className="flex-1">
                  <DiffEditor
                    original={content}
                    modified={problem.answerCode}
                    language="javascript"
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      automaticLayout: true,
                      renderSideBySide: true,
                      scrollBeyondLastLine: false,
                      minimap: {
                        enabled: false,
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              <Editor
                value={problem.answerCode}
                language="javascript"
                theme="vs-dark"
                options={{
                  readOnly: true,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
