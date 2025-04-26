import React from "react";
import { SlideCheckButton } from "./checkSlideButton";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#fff", // 背景色を白に変更
        color: "#333",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        position: "relative",
        bottom: 0,
        width: "100%",
        borderTop: "1px solid #ddd", // 境界線を追加
      }}
    >
      {/* 左側にボタンを配置 */}
      <SlideCheckButton />
      <p>&copy; Prog-8番出口. All rights reserved.</p>
    </footer>
  );
}
