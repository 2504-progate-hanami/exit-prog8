import type { Anomaly } from "~/types/anomaly";
import type * as monaco from "monaco-editor";

declare global {
  interface Window {
    monaco?: typeof monaco;
  }
}

export default {
  id: "levelUpFontSize",
  name: "フォントサイズが強い",
  description:
    "Monacoエディターのフォントサイズがめちゃくちゃ大きくなりました。",
  execute: async () => {
    // Modify Monaco Editor font size
    const monacoEditor = window.monaco?.editor;
    if (monacoEditor) {
      const editorInstances = monacoEditor.getEditors();
      editorInstances.forEach((editor) => {
        editor.updateOptions({ fontSize: 80 });
      });
      console.log("Monaco Editor font size set to 50px.");
    } else {
      console.error("Monaco Editor not found.");
    }
  },
} as Anomaly;
