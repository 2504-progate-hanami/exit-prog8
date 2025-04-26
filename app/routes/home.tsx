import { HomeButton } from "./homeButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to Prog-8
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        プログラミングの旅を始めましょう！ボタンをクリックして次のステップへ進んでください。
      </p>
      <HomeButton detail={"始める"} onC={() => navigate("/explain")} />
    </div>
  );
}
