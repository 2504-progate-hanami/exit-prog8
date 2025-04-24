import { useState } from "react";
import { sendResetPasswordEmail } from "../supabase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await sendResetPasswordEmail(email);
    if (error) {
      setMessage("エラーが発生しました。メールアドレスを確認してください。");
      console.error(error);
    } else {
      setMessage("パスワードリセット用のメールを送信しました 📩");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">パスワードを忘れた場合</h1>
      <p>
        ご登録いただいたメールアドレスを入力してください。
        <br />
        メールアドレス宛に、パスワード変更ページのURLが記載されたメールを送信します。
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          送信
        </button>
        {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
