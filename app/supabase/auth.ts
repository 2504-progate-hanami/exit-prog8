import { supabase } from "./client";
import { addUser } from "./user";

export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("サインアップ失敗！:", error.message);
    return { error };
  }

  const user = data.user;
  if (user) {
    const { error: dbError } = await addUser(user.id, name);
    if (dbError) {
      console.error("ユーザー情報の保存に失敗しました:", dbError.message);
      return { error: dbError };
    }
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

export const sendResetPasswordEmail = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset-password",
  });
};

export const updatePassword = async (newPassword: string) => {
  return await supabase.auth.updateUser({ password: newPassword });
};
