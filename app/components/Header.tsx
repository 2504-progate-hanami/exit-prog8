import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "../supabase/auth";
import { getUserName } from "../supabase/user";
import { Link } from "react-router-dom";

export function Header() {
  const [user, setUser] = useState<null | { email: string; name: string }>(
    null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser && currentUser.id) {
        const name = await getUserName(currentUser.id); // UUIDで名前を取得
        const email = currentUser.email || "不明なメールアドレス"; // デフォルト値を設定
        setUser({ email: email, name: name || "名無し" });
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error("ログアウト失敗💦:", error.message);
    } else {
      setUser(null);
      console.log("ログアウト成功✨");
    }
  };

  return (
    <header className="bg-white shadow-lg py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 左上のアプリ名 */}
        <Link to="/home" className="text-lg font-bold text-gray-800">
          8
        </Link>

        {/* 右上のメニュー */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              {/* ユーザーアイコン */}
              <div
                className="w-8 h-8 bg-gray-300 rounded-full shadow-md flex items-center justify-center"
                title="ユーザーアイコン"
              >
                {user.name.charAt(0)}
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:underline text-[12px]"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-gray-600 hover:underline text-[12px]"
              >
                ログイン
              </Link>
              <Link
                to="/signup"
                className="bg-[#fc5476] text-white text-[12px] px-4 py-2 rounded hover:bg-pink-600"
              >
                新規会員登録
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
