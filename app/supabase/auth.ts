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
