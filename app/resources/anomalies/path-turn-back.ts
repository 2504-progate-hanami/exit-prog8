import type { Anomaly } from "~/types/anomaly";

export default {
  id: "path-turn-back",
  name: "パスに「引き返せ」",
  description: "パスパラメータが「turn-back」になっている",
  execute: async () => {
    // 現在のURLが /problems/ で始まる場合のみ実行
    if (window.location.pathname.includes("/problems/")) {
      // 実際のURLはそのままで、表示だけを変更
      window.history.replaceState(
        null,
        "",
        "/problems/引き返せ引き返せ引き返せ",
      );

      // URL変更を検知して自動的に戻さないよう、popstateイベントリスナーを追加
      const handlePopState = () => {
        if (!window.location.pathname.includes("/turn-back")) {
          window.history.replaceState(null, "", "/problems/turn-back");
        }
      };

      // popstateイベントリスナーを追加
      window.addEventListener("popstate", handlePopState);

      console.log("パス迷子の異変が発生しました！");
    }
  },
} as Anomaly;
