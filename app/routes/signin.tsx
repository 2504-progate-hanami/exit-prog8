import { useState } from "react";
import { signIn } from "../supabase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter, FaApple } from "react-icons/fa";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!email) {
      setEmailError("メールアドレスを入力してください");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("メールアドレスが正しくありません");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("パスワードを入力してください");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    const { error } = await signIn(email, password);
    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/home");
    }
  };

  const isButtonDisabled = !email || !password;

  return (
    <div className="p-4 max-w-md mx-auto text-sm">
      {" "}
      {/* 全体の文字サイズを小さくする */}
      <h2 className="text-2xl mb-4">ログイン</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="メールアドレス"
            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#31c8d5] placeholder-[#d0d0e2] transition-colors ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (!email) {
                setEmailError("メールアドレスを入力してください");
              } else if (!validateEmail(email)) {
                setEmailError("メールアドレスが正しくありません");
              } else {
                setEmailError("");
              }
            }}
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="パスワード"
            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#31c8d5] placeholder-[#d0d0e2] transition-colors ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => {
              if (!password) {
                setPasswordError("パスワードを入力してください");
              } else {
                setPasswordError("");
              }
            }}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <button
          type="submit"
          className={`w-full p-2 rounded text-center transition-colors ${
            isButtonDisabled
              ? "bg-[#f0f4f8] text-[#d0d0e2] cursor-not-allowed"
              : "bg-[#31c8d5] text-white hover:bg-[#23a4b0]"
          }`}
          disabled={isButtonDisabled}
        >
          ログイン
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          パスワードを忘れた場合は{" "}
          <Link to="/forgot" className="text-blue-600 hover:underline">
            こちら
          </Link>
        </p>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">または</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="space-y-2">
          <button className="w-full p-2 flex items-center justify-center border border-gray-200 bg-white rounded transition-all duration-500 hover:border-black">
            <FcGoogle className="w-4 h-4 mr-2" />
            <span className="text-xs text-gray-600">Googleで続ける</span>
          </button>
          <button className="w-full p-2 flex items-center justify-center border border-gray-200 bg-white rounded transition-all duration-500 hover:border-black">
            <FaFacebook className="w-4 h-4 mr-2 text-[#3b5998]" />
            <span className="text-xs text-gray-600">Facebookで続ける</span>
          </button>
          <button className="w-full p-2 flex items-center justify-center border border-gray-200 bg-white rounded transition-all duration-500 hover:border-black">
            <FaTwitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
            <span className="text-xs text-gray-600">Xで続ける</span>
          </button>
          <button className="w-full p-2 flex items-center justify-center border border-gray-200 bg-white rounded transition-all duration-500 hover:border-black">
            <FaApple className="w-4 h-4 mr-2 text-black" />
            <span className="text-xs text-gray-600">Appleで続ける</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          アカウントをお持ちでないですか？{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
