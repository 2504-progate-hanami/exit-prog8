import type { Anomaly } from "~/types/anomaly";
import { temporaryEditorConfigAtom } from "~/atoms";
import { getDefaultStore } from "jotai";

export default {
  id: "levelUpFontSize",
  name: "フォントサイズが徐々にデカくなる",
  description:
    "Monacoエディターのフォントサイズが30秒かけて徐々に巨大化します。",
  execute: async () => {
    try {
      // 初期フォントサイズと最終フォントサイズ
      const startSize = 14; // 普通のサイズからスタート
      const endSize = 100; // かなりデカく
      const duration = 30000; // 30秒
      const interval = 800; // 0.8秒ごとに更新
      const steps = duration / interval;
      const incrementPerStep = (endSize - startSize) / steps;

      // jotaiのストアを取得
      const store = getDefaultStore();

      // まず通常サイズに設定
      store.set(temporaryEditorConfigAtom, {
        fontSize: startSize,
      });

      // カウンターと現在のサイズを追跡
      let currentStep = 0;
      let currentSize = startSize;

      // 徐々に大きくするインターバル
      const growInterval = setInterval(() => {
        currentStep++;

        // 線形に成長させる
        currentSize = startSize + incrementPerStep * currentStep;

        // サイズを更新
        store.set(temporaryEditorConfigAtom, {
          fontSize: Math.round(currentSize),
        });

        // 終了チェック
        if (currentStep >= steps) {
          clearInterval(growInterval);

          // 3秒間最大サイズを維持してから元に戻す
          setTimeout(() => {
            // スムーズに戻すため、まず少し小さくする
            store.set(temporaryEditorConfigAtom, {
              fontSize: 40,
            });

            // 少し待ってから完全に戻す
            setTimeout(() => {
              store.set(temporaryEditorConfigAtom, {
                fontSize: 14, // デフォルトサイズに戻す
              });
              console.log("フォントサイズを元に戻したよ");
            }, 500);
          }, 3000);
        }
      }, interval);

      console.log("フォントサイズが30秒かけて線形に大きくなるよ");
    } catch (err) {
      console.error("フォントサイズの設定に失敗:", err);
    }
  },
} as Anomaly;
