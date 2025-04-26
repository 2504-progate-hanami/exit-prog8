/**
 * 静的テストは、コードを受け取ってチェックする
 */
export interface StaticChecker {
  description: string;
  check: (code: string) => boolean;

  // ユーザに対して表示されるメッセージ
  message?: string;
}
/**
 * 動的テストは、出力を受け取ってチェックする
 */
export interface DynamicChecker {
  description: string;
  check: (out: string) => boolean;

  // ユーザに対して表示されるメッセージ
  message?: string;
}
export type Checker = StaticChecker | DynamicChecker;
/**
 * ユーザの入力したコードに対して行われるチェックの結果を表すオブジェクト。
 */
export interface CheckResult {
  status: "success" | "failed";
  failedChecker?: Checker;
}
