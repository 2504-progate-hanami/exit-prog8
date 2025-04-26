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
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (problem?.initialCode) {
      setContent(problem.initialCode);
    }
  }, [problem, setContent]);

  useEffect(() => {
    if (webContainer && editorInstance) {
      console.log("WebContainer準備完了！エディタアクションを設定するよ🦈");

      const actionId = "execute-custom-action-with-webcontainer";

      // @ts-expect-error Monaco Editor の actions API には型定義がないため
      const actions = editorInstance.getActions();
      // @ts-expect-error actions.find にも型定義がないため
      const existingAction = actions.find((action) => action.id === actionId);
      if (existingAction) {
        // @ts-expect-error removeAction メソッドにも型定義がないため
        editorInstance.removeAction(actionId);
      }

      editorInstance.addAction({
        id: actionId,
        label: "Execute Custom Action",
        keybindings: [
          // @ts-expect-error monaco.KeyMod と monaco.KeyCode の型定義がないため
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        ],
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
        run: function (): void {
          checkHandle();
          setShowSubmitPopup(true);
        },
      });

      console.log(
        "エディタアクションの設定完了！Ctrl+Enterでコード実行できるようになったよ🦈",
      );
    }
  }, [webContainer, editorInstance]);

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
    monacoInstance: typeof monaco,
  ): void {
    setEditorInstance(editor);

    editor.onDidChangeModelContent(() => {
      setContent(editor.getValue());
    });

    editor.addAction({
      id: "temporary-action",
      label: "Execute Custom Action (Loading...)",

      keybindings: [
        monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
      ],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function (): void {
        console.error(
          "WebContainerがまだ準備できていません🦈 少し待ってからもう一度試してね！",
        );
      },
    });
  }

  const closeSubmitPopup = () => {
    setShowSubmitPopup(false);
  };

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
        <EditorHoverButton mode="answer" />
        <SubmitButton onClick={() => checkHandle()} />
      </div>

      {showSubmitPopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border-l-4 border-red-500 text-black px-4 py-10 rounded shadow-lg">
          <button
            onClick={closeSubmitPopup}
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
