import React from "react";

interface ProgressBarProps {
  progress: number; // 0～100の値を受け取る
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.bar, width: `${progress}%` }} />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#76c7c0",
    transition: "width 0.3s ease",
  },
};

export default ProgressBar;
