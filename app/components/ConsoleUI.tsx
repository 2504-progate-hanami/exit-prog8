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
        "-e",
        `
        const { runCode } = require('./codeRunner.js');
        process.stdout.write(runCode(\`${codeToRun}\`));
      `,
      ]);

      let output = "";
      nodeProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            output += data;
            setConsoleOutput(output);
          },
        }),
      );

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
