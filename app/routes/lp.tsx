import React from "react";

const LP: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        fontFamily: "'Arial', sans-serif",
        minHeight: "100vh",
        overflow: "hidden",
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

      {/* タイトル */}
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
            番出口
          </span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#ddd", marginTop: "20px" }}>
          Login to get started
        </p>
        {/* ログインボタン */}
        <button
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
            transition: "transform 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => (window.location.href = "/signin")}
        >
          Login
        </button>
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
