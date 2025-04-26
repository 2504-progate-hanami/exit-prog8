import { useState } from "react";
import type { JSX } from "react";
import { useAtom } from "jotai";
import { editorContentAtom } from "~/atoms";
import { webContainerAtom } from "~/atoms";
import { problemAtom } from "~/atoms";

type ConsoleUIProps = {
  mode: "console" | "sample";
  className?: string; // 追加：外部からスタイルを適用できるようにする
};

export function ConsoleUI({
  mode,
  className = "",
}: ConsoleUIProps): JSX.Element {
  const [content] = useAtom(editorContentAtom);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [webContainer] = useAtom(webContainerAtom);
  const [problem] = useAtom(problemAtom);

  const handleRun = async () => {
    try {
      setIsLoading(true);
      setConsoleOutput("");

      if (!webContainer) {
        throw new Error("WebContainer is not initialized");
      }

      const codeToRun =
        mode === "console" ? content : problem?.answerCode || "";

      const nodeProcess = await webContainer.spawn("node", [
        "codeRunner.js",
        codeToRun,
      ]);

      let output = "";
      const endMarker = "__EOF__";
      const reader = nodeProcess.output.getReader();

      // チャンク単位で読み込む
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        output += value;
        setConsoleOutput(output);

        // 終端マーカーが見つかったら処理終了
        if (output.includes(endMarker)) {
          // 終端マーカーを取り除いて表示
          const cleanOutput = output.replace(endMarker, "").trim();
          setConsoleOutput(cleanOutput);
          break;
        }
      }

      await nodeProcess.exit;
    } catch (error) {
      setConsoleOutput(
        `実行エラー: ${error instanceof Error ? error.message : "不明なエラー"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = isLoading ? "実行中..." : "実行";

  return (
    <div
      className={`rounded-md overflow-hidden shadow-lg border border-gray-200 bg-white flex flex-col h-full ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="font-mono text-sm text-gray-700">
          {">_ " + (mode === "console" ? "コンソール" : "見本")}
        </span>
        <button
          type="button"
          onClick={handleRun}
          disabled={isLoading}
          className={`text-gray-600 cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {buttonText}
        </button>
      </div>

      <div className="p-4 bg-[#0f172a] overflow-y-auto flex-grow">
        <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
          {consoleOutput}
        </pre>
      </div>
    </div>
  );
}
