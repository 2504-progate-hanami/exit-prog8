import React, { useEffect } from "react";
import "../routes/congrats.css";

const Congrats: React.FC = () => {
  useEffect(() => {
    const confettiScript = document.createElement("script");
    confettiScript.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    confettiScript.async = true;
    confettiScript.onload = () => {
      const confetti = (
        window as unknown as {
          confetti: (options: {
            particleCount: number;
            spread: number;
            origin: { y: number };
          }) => void;
        }
      ).confetti;
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    };
    document.body.appendChild(confettiScript);

    return () => {
      document.body.removeChild(confettiScript);
    };
  }, []);

  return (
    <div className="congrats-container">
      <h1 className="congrats-title">Congratulations! 🎉</h1>
      <p className="congrats-message">
        すべての問題を解決しました！
        <br />
      </p>
      <img
        src="/ninja-1.png"
        alt="Congratulations"
        className="w-96 mb-5 congrats-image"
      />
      <a href="/" className="congrats-button">
        Go to LP
      </a>
    </div>
  );
};

export default Congrats;
