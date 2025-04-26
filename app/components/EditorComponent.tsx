import React, { useEffect, useState } from "react";
import type * as monaco from "monaco-editor";
import { useAtom } from "jotai";
import { SubmitButton } from "./SubmitButton";
import { EditorHoverButton } from "./EditorHoverButton";
import { editorInstanceAtom, editorContentAtom } from "../atoms";
import Editor from "@monaco-editor/react";
import { webContainerAtom, problemAtom } from "~/atoms";

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

    // コードを実行し、出力を受け取る
    webContainer
      .spawn("npx", ["tsc", "--outDir", "dist"])
      .then(() => {
        return webContainer.spawn("node", ["dist/codeRunner.js", content]);
      })
      .then((process: { output: ReadableStream }) => {
        process.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log(data);
            },
          }),
        );
      })
      .catch((error: Error) => {
        console.error("チェック実行中にエラーが発生:", error);
      });

    // 出力に対し、動的チェックを実行する
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
