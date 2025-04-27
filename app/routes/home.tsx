import { HomeButton } from "./homeButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-white">
      <div className="bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-12">
        <h1 className="text-4xl font-bold mb-8 text-center uppercase tracking-wider text-white">
          <span className="text-gray-400">Welcome</span> to p
          <span className="lowercase">rog</span>-8
        </h1>
        <p className="text-lg text-gray-300 mb-10 text-center leading-relaxed">
          プログラミングの旅を、
          <span className="font-semibold text-white">今すぐ</span>
          始めよう！下のボタンをクリック。
        </p>
        <div className="flex justify-center">
          <HomeButton
            detail={"始める"}
            onC={() => navigate("/explain")}
            className="bg-[#47ecd5] hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline uppercase tracking-wider"
          />
        </div>
      </div>
    </div>
  );
}
