import { useState } from "react";
import { signUp } from "../supabase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signUp(email, password, name);
    if (error) {
      setErrorMsg(error.message);
      setSuccessMsg("");
    } else {
      setErrorMsg("");
      setSuccessMsg("サインアップ成功！メール確認してね📧");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-sm">
      {" "}
      {/* 全体の文字サイズを小さくする */}
      <h2 className="text-2xl font-bold mb-4">サインアップ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="メールアドレス"
            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#31c8d5] placeholder-[#d0d0e2] transition-colors ${
              errorMsg ? "border-red-500" : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="パスワード"
            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#31c8d5] placeholder-[#d0d0e2] transition-colors ${
              errorMsg ? "border-red-500" : "border-gray-300"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="名前"
            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#31c8d5] placeholder-[#d0d0e2] transition-colors ${
              errorMsg ? "border-red-500" : "border-gray-300"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-600 text-sm mt-1">{successMsg}</p>
        )}

        <button
          type="submit"
          className={`w-full p-2 rounded text-center transition-colors ${
            !email || !password || !name
              ? "bg-[#f0f4f8] text-[#d0d0e2] cursor-not-allowed"
              : "bg-[#31c8d5] text-white hover:bg-[#23a4b0]"
          }`}
          disabled={!email || !password || !name}
        >
          新規登録
        </button>
      </form>
    </div>
  );
}
