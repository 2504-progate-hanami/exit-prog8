import type { Anomaly } from "~/types/anomaly";

export default {
  id: "shaking-screen",
  name: "画面が揺れる",
  description: "キーボード入力があると画面全体が揺れる異変",
  execute: async () => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
      }
      .shaking {
        animation: shake 0.5s ease-in-out;
      }
    `;
    document.head.appendChild(styleElement);

    const handleKeydown = () => {
      document.body.classList.add("shaking");
      setTimeout(() => {
        document.body.classList.remove("shaking");
      }, 500); // アニメーションの時間と一致させる
    };

    window.addEventListener("keydown", handleKeydown);

    // クリーンアップ用の関数を返す
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  },
} as Anomaly;
