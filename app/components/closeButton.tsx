import type { CSSProperties } from "react"; // 型のみのインポートに変更

export function CloseButton() {
  const buttonStyle: CSSProperties = {
    backgroundColor: "#4682B4",
    color: "white",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    cursor: "pointer",
    padding: 0,
    position: "relative",
  };

  const crossCommonStyle: CSSProperties = {
    content: "''",
    position: "absolute",
    width: "16px",
    height: "2px",
    backgroundColor: "white",
  };

  const crossBeforeStyle: CSSProperties = {
    ...crossCommonStyle,
    transform: "rotate(45deg)",
  };

  const crossAfterStyle: CSSProperties = {
    ...crossCommonStyle,
    transform: "rotate(-45deg)",
  };

  const hoverStyle: CSSProperties = {
    opacity: 0.8,
  };

  return (
    <button
      style={buttonStyle}
      // onClickは後から追加することを想定
      aria-label={"close"}
      onMouseOver={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        if (hoverStyle.opacity !== undefined) {
          target.style.opacity = hoverStyle.opacity.toString();
        }
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
      }}
    >
      <span style={crossBeforeStyle}></span>
      <span style={crossAfterStyle}></span>
    </button>
  );
}
