/**
 * セッションストレージのキー
 */
export const SESSION_KEYS = {
  NOW_PROBLEM_NUMBER: "nowProblemNumber",
};

/**
 * 現在の問題番号をセッションストレージから取得する
 * @returns 問題番号（存在しない場合は0）
 */
export function getNowProblemNumber(): number {
  try {
    const value = sessionStorage.getItem(SESSION_KEYS.NOW_PROBLEM_NUMBER);
    return value ? parseInt(value, 10) : 0;
  } catch (e) {
    console.error("セッションストレージから問題番号を取得できませんでした", e);
    return 0;
  }
}

/**
 * 現在の問題番号をセッションストレージに保存する
 * @param value 保存する問題番号
 */
export function setNowProblemNumber(value: number): void {
  try {
    sessionStorage.setItem(SESSION_KEYS.NOW_PROBLEM_NUMBER, value.toString());
  } catch (e) {
    console.error("セッションストレージに問題番号を保存できませんでした", e);
  }
}
