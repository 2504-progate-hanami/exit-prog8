import React from "react";

const LP: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        fontFamily: "'Arial', sans-serif",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#f9fbfe", // 背景色を変更
      }}
    >
      {/* 背景の黒白斜め分割 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #000 50%, #fff 50%)",
          zIndex: -1,
        }}
      ></div>

      {/* "このProgate、なんか変...?" を一番上に移動し、文字サイズをアップ */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#2b546a", // 文字色を変更
          fontSize: "2.5rem", // 文字サイズをさらに大きく
          fontWeight: "bold",
          lineHeight: "1.5", // 行間を調整
        }}
      >
        <p>このProgate、なんか変...?</p>
      </div>

      {/* タイトルをチャレンジボタンの下に移動 */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#fff",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            animation: "bounce 1.5s infinite",
          }}
        >
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif", // 英語のスタイリッシュなフォント
              fontSize: "3.5rem",
              marginRight: "10px",
            }}
          >
            Prog-8
          </span>
          <span
            style={{
              fontFamily: "'Noto Sans JP', sans-serif", // 日本語のゴシック体
              fontSize: "3rem",
            }}
          >
            版出口
          </span>
        </h1>
      </div>

      {/* ログインボタンを変更 */}
      <div style={{ textAlign: "center" }}>
        {" "}
        {/* ボタンを中央揃え */}
        <button
          style={{
            backgroundColor: "#fc5476", // ボタンの背景色を変更
            color: "white",
            border: "none",
            padding: "10px 20px", // ボタンサイズを小さく調整
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px", // 文字サイズを少し小さく
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
            transition: "background-color 0.3s", // ホバー時の色変更
          }}
          onMouseOver={(e) => {
            document.documentElement.style.backgroundColor = "#2b546a"; // 全体の背景色を紺色に変更
            e.currentTarget.style.backgroundColor = "#2b546a"; // ボタンの背景色を変更
            e.currentTarget.innerHTML = "??????????????????????????"; // 文字を変更
          }}
          onMouseOut={(e) => {
            document.documentElement.style.backgroundColor = "#f9fbfe"; // 全体の背景色を元に戻す
            e.currentTarget.style.backgroundColor = "#fc5476"; // ボタンの背景色を元に戻す
            e.currentTarget.innerHTML = "まずは無料でチャレンジ"; // 元の文字に戻す
          }}
          onClick={() => (window.location.href = "/signup")}
        >
          まずは無料でチャレンジ
        </button>
      </div>

      {/* ninja-3.png を画面下部に配置 */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "0",
          width: "100%", // 横幅を100%に設定
          height: "300px", // 高さはそのまま
          backgroundColor: "#89e7ce", // 背景色を89e7ceに設定
          display: "flex",
          justifyContent: "center", // 中央揃え
          alignItems: "center", // 中央揃え
        }}
      >
        <img
          src="/ninja-3.png"
          alt="ninja-3"
          style={{
            width: "auto", // 幅を自動調整
            height: "100%", // 高さを100%に設定
            objectFit: "contain", // 画像をコンテナにフィットさせる
          }}
        />
      </div>

      {/* アニメーション用のスタイル */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default LP;
