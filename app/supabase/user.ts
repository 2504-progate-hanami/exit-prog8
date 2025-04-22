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
