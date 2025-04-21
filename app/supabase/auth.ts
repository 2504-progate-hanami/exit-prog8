import { supabase } from "./client";

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("サインアップ失敗！:", error.message);
    return { error };
  }

  console.log("サインアップ成功:", data);
  return { data };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("ログイン失敗:", error.message);
    return { error };
  }

  console.log("ログイン成功:", data);
  return { data };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("ユーザー情報の取得に失敗しました💦:", error.message);
    return null;
  }
  return data.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("サインアウト失敗💦:", error.message);
    return { error };
  }
  console.log("サインアウト成功✨");
  return { success: true };
};
