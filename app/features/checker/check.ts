/**
 * 静的テストは、コードを受け取ってチェックする
 */
interface StaticChecker {
  description: string;
  check: (code: string) => boolean;

  // ユーザに対して表示されるメッセージ
  message?: string;
}

/**
 * 動的テストは、出力を受け取ってチェックする
 */
interface DynamicChecker {
  description: string;
  check: (out: string) => boolean;

  // ユーザに対して表示されるメッセージ
  message?: string;
}

type Checker = StaticChecker | DynamicChecker;

/**
 * ユーザの入力したコードに対して行われるチェックの結果を表すオブジェクト。
 */
interface CheckResult {
  status: "success" | "failed";
  failedChecker?: Checker;
}

/**
 * ユーザの入力に対し、テストを行う。
 *
 * テストは 静的テストと動的テストに分けられる。
 * @param code ユーザの入力したコード
 * @param staticCheckers 静的テストを行うCheckerの配列
 * @param dynamicCheckers 動的テストを行うCheckerの配列
 * @returns チェック結果
 */
export const check = (
  code: string,
  staticCheckers: Array<StaticChecker>,
  dynamicCheckers: Array<DynamicChecker>,
): CheckResult => {
  // 静的チェック
  for (const checker of staticCheckers) {
    if (!checker.check(code)) {
      return {
        status: "failed",
        failedChecker: checker,
      };
    }
  }

  // 動的チェック
  for (const checker of dynamicCheckers) {
    // コードを実行して出力を取得する
    const out = runCode(code);
    if (!checker.check(out)) {
      return {
        status: "failed",
        failedChecker: checker,
      };
    }
  }

  return { status: "success" };
};

/**
 * コードを実行して出力を取得する関数。
 * @param code 実行するコード
 * @returns コードの実行結果
 */
const runCode = (code: string): string => {
  try {
    const result = eval(code);
    return result;
  } catch (e) {
    return `Error: ${e}`;
  }
};
