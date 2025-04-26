import type { Anomaly } from "~/types/anomaly";

export default {
  id: "snowstorm-effect",
  name: "吹雪と花びらエフェクト",
  description: "画面全体に吹雪が吹き、花びらが舞うエフェクトが発生しました",
  execute: async () => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
          .snowstorm-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 9999;
          }
          .snowflake, .petal {
            position: absolute;
            top: -10%;
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
            animation: fall 5s linear infinite;
          }
          .petal {
            width: 12px;
            height: 12px;
            background: pink;
            border-radius: 50% 50% 50% 0;
            transform: rotate(45deg);
          }
          @keyframes fall {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) translateX(calc(-50vw + 100px));
              opacity: 0;
            }
          }
        `;
    document.head.appendChild(styleElement);

    const container = document.createElement("div");
    container.classList.add("snowstorm-container");
    document.body.appendChild(container);

    // エフェクトの数を増やす
    for (let i = 0; i < 200; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(snowflake);

      const petal = document.createElement("div");
      petal.classList.add("petal");
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(petal);
    }
  },
} as Anomaly;
