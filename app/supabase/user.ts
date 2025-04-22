import { supabase } from "./client";

export const addUser = async (uuid: string, name: string) => {
  const { data, error } = await supabase
    .from("User")
    .insert({ uuid: uuid, user_name: name });

  if (error) {
    console.error("ユーザー情報の保存に失敗💦:", error.message);
    return { error };
  }
  console.log("ユーザー情報を保存しました✨:", data);
  return { data };
};

export const getUserName = async (uuid: string) => {
  const { data, error } = await supabase
    .from("User")
    .select("user_name")
    .eq("uuid", uuid)
    .single();

  if (error) {
    console.error("ユーザー名の取得に失敗しました:", error.message);
    return null;
  }

  return data?.user_name || null;
};
