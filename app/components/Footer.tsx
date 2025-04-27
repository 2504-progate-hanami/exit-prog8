import React, { useEffect, useState } from "react";
import { SlideCheckButton } from "./checkSlideButton";
import { useAtom } from "jotai";
import { nowProblemNumberAtom } from "~/atoms";
import { getNowProblemNumber } from "~/utils/sessionStorage";

export function Footer() {
  // atomからの値を使うけど、必要に応じてセッションストレージからも取得する
  const [nowProblemNumber] = useAtom(nowProblemNumberAtom);
  const [problemNumber, setProblemNumber] = useState<number>(0);

  // マウント時とnowProblemNumberが変わったときに更新
  useEffect(() => {
    // セッションストレージから値を取得
    const sessionValue = getNowProblemNumber();

    // atom値とセッションストレージ値を比較し、大きい方を使用
    const actualValue = Math.max(sessionValue, nowProblemNumber);

    console.log("Footer更新:", {
      atomValue: nowProblemNumber,
      sessionValue,
      actualValue,
    });

    setProblemNumber(actualValue);
  }, [nowProblemNumber]);

  // 表示用の進捗バー計算
  const progress = problemNumber < 2 ? 0 : (problemNumber / 8) * 100;

  return (
    <footer
      style={{
        backgroundColor: "#fff",
        color: "#333",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        position: "relative",
        bottom: 0,
        width: "100%",
        borderTop: "1px solid #ddd",
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
            width: "200px",
            height: "20px",
            backgroundColor: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#8AC75A",
            }}
          ></div>
        </div>
      </div>
      <p>&copy; Prog-8番出口. All rights reserved.</p>
    </footer>
  );
}
