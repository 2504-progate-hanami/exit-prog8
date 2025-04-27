import type { Anomaly } from "~/types/anomaly";
import type * as monaco from "monaco-editor";

declare global {
  interface Window {
    monaco?: typeof monaco;
  }
}

export default {
  id: "levelUpIndent",
  name: "インデントが強い",
  description: "インデントが半角30になりました。",
  execute: async () => {
    const elm = document.querySelector("header");
    if (!elm) {
      console.error("Element not found:");
      return;
    }
    const styleElement = document.createElement("style");
    styleElement.textContent = `
          .rainbow-gradient {
            background: linear-gradient(to right,#e60000,#f39800,#fff100,#009944,#0068b7,#1d2088,#920783,#e60000) 0 / 200%;
            animation: 5s example4 linear infinite;
          }
          @keyframes example4 {
            100% { background-position: 200%; }
          }
        `;
    document.head.appendChild(styleElement);
    elm.classList.add("rainbow-gradient");

    // Modify Monaco Editor tab size
    const monacoEditor = window.monaco?.editor;
    if (monacoEditor) {
      monacoEditor.getModels().forEach((model: monaco.editor.ITextModel) => {
        model.updateOptions({ tabSize: 30 });
      });
      console.log("Monaco Editor tab size set to 30 spaces.");
    } else {
      console.error("Monaco Editor not found.");
    }
  },
} as Anomaly;
