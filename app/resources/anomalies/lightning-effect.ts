import type { Anomaly } from "~/types/anomaly";

export default {
  id: "lightning-effect",
  name: "雷エフェクト",
  description:
    "画面全体にランダムで雷が落ち、画面が揺れるエフェクトが発生しました",
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
            width: 10px;
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
          .screen-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
          @keyframes shake {
            0%, 100% { transform: translate(0, 0); }
            10%, 90% { transform: translate(-4px, 0); }
            20%, 80% { transform: translate(6px, 0); }
            30%, 70% { transform: translate(-8px, 0); }
            40%, 60% { transform: translate(8px, 0); }
            50% { transform: translate(-6px, 0); }
          }
        `;
    document.head.appendChild(styleElement);

    const container = document.createElement("div");
    container.classList.add("lightning-container");
    document.body.appendChild(container);

    // 雷と画面揺れをランダムに発生させる
    setInterval(() => {
      // ランダムな雷を生成
      const lightning = document.createElement("div");
      lightning.classList.add("lightning");
      lightning.style.left = `${Math.random() * 100}vw`;
      container.appendChild(lightning);

      // 雷と同時に画面を揺らす
      document.body.classList.add("screen-shake");

      // 雷を一定時間後に削除
      setTimeout(() => {
        lightning.remove();
      }, 200);

      // 揺れを止める
      setTimeout(() => {
        document.body.classList.remove("screen-shake");
      }, 500);
    }, 3000); // 3秒ごとに雷を生成（頻度を下げた）
  },
} as Anomaly;
