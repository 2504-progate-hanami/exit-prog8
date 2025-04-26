import Editor from "@monaco-editor/react";
import { useAtom } from "jotai";
import type * as monaco from "monaco-editor";
import { useEffect, useState } from "react";
import { problemAtom, webContainerAtom } from "~/atoms";
import { editorContentAtom, editorInstanceAtom } from "../atoms";
import { EditorHoverButton } from "./EditorHoverButton";
import { SubmitButton } from "./SubmitButton";

export function EditorComponent() {
  const [editorInstance, setEditorInstance] = useAtom(editorInstanceAtom);
  const [content, setContent] = useAtom(editorContentAtom);
  const [isMounted, setIsMounted] = useState(false);
  const [webContainer] = useAtom(webContainerAtom);
  const [problem] = useAtom(problemAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (problem?.initialCode) {
      setContent(problem.initialCode);
    }
  }, [problem, setContent]);

  function checkHandle() {
    if (!webContainer) {
      console.error("webContainer が null です。処理を中断します。");
      return;
    }

    if (!problem) {
      console.error("問題データが null です。処理を中断します。");
      return;
    }

    // 静的チェックを実行する
    const staticCheckers = problem.checkers.static;
    for (const checker of staticCheckers) {
      if (!checker.check(content)) {
        // TODO: atom で error を管理、ポップアップを表示
        console.error("静的チェックに失敗:", checker.message);
        return;
      }
    }

    // コードを実行し、出力を受け取る
    let output = "";
    const endMarker = "__EOF__";

    webContainer
      .spawn("npx", ["tsc", "--outDir", "dist"])
      .then(() => {
        return webContainer.spawn("node", ["codeRunner.js", content]);
      })
      .then((process: { output: ReadableStream }) => {
        const reader = process.output.getReader();

        // 再帰的にstreamを読み込む
        return new Promise((resolve) => {
          function readChunk() {
            reader.read().then(({ done, value }) => {
              if (done) {
                console.log("読み込み完了:", output);
                resolve(output);
                return;
              }

              const chunk = value || "";
              output += chunk;

              // 終端マーカーが見つかったらストリームを閉じる
              if (output.includes(endMarker)) {
                // 終端マーカーを削除
                output = output.replace(endMarker, "").trim();
                console.log("終端マーカーを検出、読み込み完了:", output);
                resolve(output);
                return;
              }

              readChunk();
            });
          }

          readChunk();
        });
      })
      .then((finalOutput) => {
        // finalOutputを使って動的チェックを実行
        const dynamicCheckers = problem.checkers.dynamic;
        for (const checker of dynamicCheckers) {
          if (!checker.check(finalOutput as string)) {
            console.error("動的チェックに失敗:", checker.message);
            return;
          }
        }

        console.log("全チェック通過！おめでとう！");
      })
      .catch((error: Error) => {
        console.error("チェック実行中にエラーが発生:", error);
      });
  }

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor"),
  ): void {
    setEditorInstance(editor);

    editor.onDidChangeModelContent(() => {
      setContent(editor.getValue());
    });

    editor.addAction({
      id: "action",
      label: "Execute Custom Action",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function (): void {
        alert(content);
      },
    });
  }

  if (!isMounted) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        レンダリング中...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e]">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-white shadow-md">
        <span>script.js</span>
        <button className="text-white"></button>
      </div>

      <div className="flex-grow relative">
        <div className="absolute inset-0">
          <Editor
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue={content}
            onMount={handleEditorDidMount}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
            }}
            loading={
              <div className="h-full flex items-center justify-center text-white">
                エディターをロード中...
              </div>
            }
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2 bg-[#333] text-white">
        <EditorHoverButton
          onClick={() => {}}
          mode="reset"
          editorInstance={editorInstance}
        />
        <EditorHoverButton onClick={() => checkHandle()} mode="answer" />
        <SubmitButton onClick={() => checkHandle()} />
      </div>
    </div>
  );
}
