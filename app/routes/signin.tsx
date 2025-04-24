import { useState } from "react";
import { signIn } from "../supabase/auth";
import { Link } from "react-router-dom"; // リンク用のインポートを追加

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      setErrorMsg(error.message);
    } else {
      alert("ログイン成功🎉");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">ログイン</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ログイン
        </button>
      </form>

      {/* パスワードを忘れた場合の案内を追加 */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          パスワードを忘れた場合は{" "}
          <Link to="/forgot" className="text-blue-600 hover:underline">
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
}
