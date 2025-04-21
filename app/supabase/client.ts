import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// 環境変数の確認ログ
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL または Anon Key が設定されていません💦");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// クライアント動作確認用のテストリクエスト
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error(
      "Supabase クライアントの動作確認中にエラーが発生しました💦",
      error,
    );
  } else {
    console.log("Supabase クライアントが正常に動作しています✨", data);
  }
});
