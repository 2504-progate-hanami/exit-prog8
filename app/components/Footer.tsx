import React from "react";
import { SlideCheckButton } from "./checkSlideButton";
import { useAtom } from "jotai";
import { nowProblemNumberAtom } from "~/atoms";

export function Footer() {
  const [nowProblemNumber] = useAtom(nowProblemNumberAtom);
  const progress = nowProblemNumber < 2 ? 0 : (nowProblemNumber / 8) * 100;
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
      {/* 真ん中にプログレスバーを配置 */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "200px", // 横幅の20%
            height: "20px", // 高さを太く調整
            backgroundColor: "#ddd", // 背景色
            borderRadius: "10px", // 丸みを調整
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progress}%`, // プログレスの進捗（仮に50%）
              height: "100%",
              backgroundColor: "#8AC75A", // プログレスバーの色
            }}
          ></div>
        </div>
      </div>
      <p>&copy; Prog-8番出口. All rights reserved.</p>
    </footer>
  );
}
