import React, { useRef, useState, useEffect } from "react";
import type * as monaco from "monaco-editor";
import { SubmitButton } from "./SubmitButton";
import { EditorHoverButton } from "./EditorHoverButton";

const isServer = typeof window === "undefined";

export function EditorComponent() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [EditorLoaded, setEditorLoaded] = useState<
    typeof import("@monaco-editor/react").default | null
  >(null);

  useEffect(() => {
    if (!isServer) {
      import("@monaco-editor/react").then((module) => {
        setEditorLoaded(module.default);
      });
    }
  }, []);

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor"),
  ): void {
    editorRef.current = editor;

    editor.addAction({
      id: "action",
      label: "Execute Custom Action",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function (ed: monaco.editor.IStandaloneCodeEditor): void {
        alert(ed.getValue());
      },
    });
  }

  if (isServer || !EditorLoaded) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        エディターをロード中...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e]">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-white shadow-md">
        <span>script.js</span>
        <button className="text-white">⚙️</button>
      </div>

      <div className="flex-grow relative">
        <div className="absolute inset-0">
          <EditorLoaded
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2 bg-[#333] text-white">
        <EditorHoverButton onClick={() => alert("neko")} mode="reset" />
        <EditorHoverButton onClick={() => alert("neko")} mode="answer" />
        <SubmitButton onClick={() => alert("Button clicked!")} />
      </div>
    </div>
  );
}
