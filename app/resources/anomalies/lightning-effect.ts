import type { Anomaly } from "~/types/anomaly";

export default {
  id: "lightning-effect",
  name: "雷エフェクト",
  description: "画面全体にランダムで雷が落ちるエフェクトが発生しました",
  execute: async () => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
          .lightning-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 9999;
          }
          .lightning {
            position: absolute;
            top: 0;
            left: 50%;
            width: 2px;
            height: 100%;
            background: yellow;
            opacity: 0;
            transform: translateX(-50%);
            animation: lightning-flash 0.2s ease-in-out infinite;
          }
          @keyframes lightning-flash {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
        `;
    document.head.appendChild(styleElement);

    const container = document.createElement("div");
    container.classList.add("lightning-container");
    document.body.appendChild(container);

    // ランダムに雷を落とす
    setInterval(() => {
      const lightning = document.createElement("div");
      lightning.classList.add("lightning");
      lightning.style.left = `${Math.random() * 100}vw`;
      container.appendChild(lightning);

      // 雷を一定時間後に削除
      setTimeout(() => {
        lightning.remove();
      }, 200);
    }, 1000); // 1秒ごとに雷を生成
  },
} as Anomaly;
