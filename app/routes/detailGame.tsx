import { useNavigate } from "react-router-dom";

export default function DetailGame() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-12 bg-gray-100 font-sans">
      <h1 className="text-2xl md:text-3xl text-gray-800 mb-8 text-center">
        Prog-8版出口
      </h1>
      <p className="text-md md:text-lg text-gray-600 mb-6 text-center italic">
        そのレッスン、本当に大丈夫？
        <span className="font-bold text-[#2b546a]">異変</span>を見逃すな！
      </p>
      <div className="max-w-md w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl text-gray-800 mt-10 mb-4">
          これは、集中力が試される
          <span className="font-bold text-[#2b546a]">異変発見ゲーム</span>です。
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          プログラミングレッスンの進行中に、ふと現れる
          <span className="font-bold text-[#2b546a]">小さな違和感</span>。<br />
          何も違和感を感じなければ、自信を持って次のレッスンへ進みましょう。
          <br />
          <span className="font-bold text-red-500 mt-4 block">
            しかし、もし異変に気づいたら_____
          </span>
          <br />
          <span className="font-bold text-red-500 mb-4 block">
            迷わず前のページへ戻ってください
          </span>
        </p>
        <h2 className="text-xl text-gray-800 mt-8 mb-4">異変</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-8">
          <li>
            <span className="font-bold text-[#2b546a]">コードの着色</span>
            のわずかな変化
          </li>
          <li>
            いつもと違う<span className="font-bold text-[#2b546a]">スペル</span>
            や<span className="font-bold text-[#2b546a]">記号</span>の出現
          </li>
          <li>
            レッスン内容をしっかり理解していれば
            <span className="font-bold text-[#2b546a]">絶対に見抜ける</span>異変
          </li>
          <li>
            ...そして、
            <span className="font-bold text-[#2b546a]">想像を超える</span>
            トリッキーな異変も！？
          </li>
        </ul>
        <p className="text-lg text-gray-800 mt-10 mb-6 text-center">
          さあ、あなたの<span className="font-bold text-[#2b546a]">観察力</span>
          と<span className="font-bold text-[#2b546a]">集中力</span>
          を試しませんか？
          <br />
          この先には、
          <span className="font-bold text-[#2b546a]">未知の異変</span>
          があなたを待ち受けています。
        </p>
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#2b546a] hover:bg-[#2b546a] text-white font-bold py-3 px-6 rounded-full transition duration-300"
            onClick={() => navigate("/problems/lesson0")}
          >
            いざ、レッスンへ！
          </button>
        </div>
      </div>
    </div>
  );
}
