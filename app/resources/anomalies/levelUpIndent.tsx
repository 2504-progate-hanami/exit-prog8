// import type { Anomaly } from "~/types/anomaly";
// import type * as monaco from "monaco-editor";

// declare global {
//   interface Window {
//     monaco?: typeof monaco;
//   }
// }

// export default {
//   id: "levelUpIndent",
//   name: "インデントが強い",
//   description: "インデントが半角30になりました。",
//   execute: async () => {
//     // Modify Monaco Editor tab size only
//     const monacoEditor = window.monaco?.editor;
//     if (monacoEditor) {
//       monacoEditor.getModels().forEach((model: monaco.editor.ITextModel) => {
//         model.updateOptions({ tabSize: 30 });
//       });
//       console.log("Monaco Editor tab size set to 30 spaces.");
//     } else {
//       console.error("Monaco Editor not found.");
//     }
//   },
// } as Anomaly;
