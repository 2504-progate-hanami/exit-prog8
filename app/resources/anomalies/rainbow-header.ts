import type { Anomaly } from "~/types/anomaly";

export default {
  id: "rainbow-header",
  name: "ヘッダーが虹色",
  description: "画面上のヘッダーが虹色になっていました",
  execute: async () => {
    const elm = document.querySelector("header");
    if (!elm) {
      console.error("Element not found:");
      return;
    }
    const styleElement = document.createElement("style");
    styleElement.textContent = `
          .rainbow-gradient {
            background: linear-gradient(to right,#e60000,#f39800,#fff100,#009944,#0068b7,#1d2088,#920783,#e60000) 0 / 200%;
            animation: 5s example4 linear infinite;
          }
          @keyframes example4 {
            100% { background-position: 200%; }
          }
        `;
    document.head.appendChild(styleElement);
    elm.classList.add("rainbow-gradient");
  },
} as Anomaly;
