import type { Anomaly } from "~/types/anomaly";
import { temporaryEditorConfigAtom } from "~/atoms";
import { getDefaultStore } from "jotai";

export default {
  id: "levelUpIndent",
  name: "インデントが強い",
  description: "インデントが半角30になりました。",
  execute: async () => {
    try {
      // jotaiのストアを取得
      const store = getDefaultStore();

      // 一時的に設定を変更（Submit後に別レッスンページに行くまで継続）
      store.set(temporaryEditorConfigAtom, {
        tabSize: 30,
        // durationMsを指定しないので、手動でリセットされるまでこの設定が継続する
      });

      console.log("Monaco Editor tab size set to 30 spaces.");
    } catch (err) {
      console.error("インデント設定の変更に失敗:", err);
    }
  },
} as Anomaly;
