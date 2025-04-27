import type { Anomaly } from "~/types/anomaly";

export default {
  id: "gaming-wanko",
  name: "ゲーミングわんこ",
  description: "スライドの画像がninja-1からninja-2に変わる異変",
  execute: async () => {
    const observer = new MutationObserver(() => {
      const slideImage = document.querySelector("img[src$='ninja-1.png']");
      if (slideImage) {
        slideImage.setAttribute("src", "/ninja-2.png");
        console.log("ゲーミングわんこ異変が発生しました！");
        observer.disconnect(); // 監視を停止
      }
    });

    // body全体を監視して、モーダルが表示されたら反応する
    observer.observe(document.body, { childList: true, subtree: true });
  },
} as Anomaly;
