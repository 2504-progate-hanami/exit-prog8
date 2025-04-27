import type { Anomaly } from "~/types/anomaly";

export default {
  id: "gaming-wanko",
  name: "ゲーミングわんこ",
  description: "スライドの画像がninja-1からninja-2に変わる異変",
  execute: async () => {
    const observer = new MutationObserver(() => {
      const slideImages = document.querySelectorAll("img[src$='ninja-1.png']");
      slideImages.forEach((slideImage) => {
        slideImage.setAttribute("src", "/ninja-2.png");
        console.log("ゲーミングわんこ異変が発生しました！");
      });
    });

    // body全体を監視して、スライドが変更されるたびに反応する
    observer.observe(document.body, { childList: true, subtree: true });
  },
} as Anomaly;
