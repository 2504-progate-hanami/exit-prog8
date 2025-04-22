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
/**
 * コードを実行して出力を取得する関数。
 * @param code 実行するコード
 * @returns コードの実行結果 (console.log の出力と eval の結果を含む)
 */
const runCode = (code: string): string => {
  let logOutput = "";
  const originalConsoleLog = console.log; // 元の console.log を保存

  // console.log をオーバーライド
  console.log = (...args: unknown[]) => {
    logOutput += args.join(" ") + "\n";
  };

  let evalResult: unknown;
  try {
    evalResult = eval(code);
  } catch (e) {
    evalResult = `Error: ${e}`;
  } finally {
    // オーバーライドを元に戻す (eval の実行が終わったら必ず元に戻すことが重要！)
    console.log = originalConsoleLog;
  }

  // eval の結果と console.log の出力を結合して返す
  return (
    logOutput + (typeof evalResult !== "undefined" ? String(evalResult) : "")
  );
};

// テスト
if (import.meta) {
  const sampleCode = `
  console.log("Hello from eval!");
  console.log(1 + 2);
  const message = "World";
  message;
  `;

  const result = runCode(sampleCode);
  console.log("実行結果:\n" + result);
}
