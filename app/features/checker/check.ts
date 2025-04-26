import type {
  StaticChecker,
  DynamicChecker,
  CheckResult,
} from "../../types/checker";
import { runCode } from "../code-runner/codeRunner";

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
