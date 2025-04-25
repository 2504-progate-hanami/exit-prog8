import React, { useEffect, useState } from "react";
import type * as monaco from "monaco-editor";
import { useAtom } from "jotai";
import { SubmitButton } from "./SubmitButton";
import { EditorHoverButton } from "./EditorHoverButton";
import { editorInstanceAtom, editorContentAtom } from "../atoms";
import Editor from "@monaco-editor/react";
import { webContainerAtom } from "~/atoms";

export function EditorComponent() {
  const [editorInstance, setEditorInstance] = useAtom(editorInstanceAtom);
  const [content, setContent] = useAtom(editorContentAtom);
  const [isMounted, setIsMounted] = useState(false);
  const [webContainer] = useAtom(webContainerAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function checkHandle() {
    const staticCheckerCode = `
      const staticCheckers = [
        {
          description: "コードに 'console.log' が含まれているかチェック",
          check: (code) => code.includes("console.log"),
          message: "'console.log' を含めてください！",
        },
      ];
    `;

    const dynamicCheckerCode = `
      const dynamicCheckers = [
        {
          description: "出力に 'Hello' が含まれているかチェック",
          check: (out) => out.includes("Hello"),
          message: "出力に 'Hello' を含めてください！",
        },
      ];
    `;

    // checker.jsを使ってコードをチェックする
    if (!webContainer) {
      console.error("webContainer が null です。処理を中断します。");
      return;
    }

    webContainer
      .spawn("node", [
        "-e",
        `
      const { check } = require('./check.js');
      
      ${staticCheckerCode}
      ${dynamicCheckerCode}
      
      // エディタのコンテンツをチェック
      const codeToCheck = \`${content}\`;
      
      const result = check(codeToCheck, staticCheckers, dynamicCheckers);
      
      console.log('チェック結果:', JSON.stringify(result, null, 2));
      
      if (result.status === "success") {
        console.log("🦈 おめでとう！全てのチェックに合格したよ！");
      } else if (result.failedChecker) {
        console.log("🦈 残念！チェックに失敗したよ...");
        console.log("理由: " + (result.failedChecker.message || result.failedChecker.description));
      }
    `,
      ])
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
        <EditorHoverButton mode="reset" editorInstance={editorInstance} />
        <EditorHoverButton onClick={() => checkHandle()} mode="answer" />
        <SubmitButton onClick={() => checkHandle()} />
      </div>
    </div>
  );
}
