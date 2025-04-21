import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "../supabase/auth";

export function Header() {
  const [user, setUser] = useState<null | { email: string }>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser && currentUser.email) {
        setUser({ email: currentUser.email });
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
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">My App</h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <p>ログイン中: {user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <p>ログインしていません</p>
        )}
      </div>
    </header>
  );
}
