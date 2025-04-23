import { runCode } from "../code-runner/codeRunner";

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

// ------------------------------
// テスト
if (import.meta) {
  const staticCheckers: StaticChecker[] = [
    {
      description: "コードに 'console.log' が含まれているかチェック",
      check: (code) => code.includes("console.log"),
      message: "'console.log' を含めてください！",
    },
  ];

  const dynamicCheckers: DynamicChecker[] = [
    {
      description: "出力に 'Hello' が含まれているかチェック",
      check: (out) => out.includes("Hello"),
      message: "出力に 'Hello' を含めてください！",
    },
  ];

  const sampleCode = `
  console.log("Hello from eval!");
  console.log(1 + 2);
  const message = "World";
  message;
  `;
  console.log(`コード: ${sampleCode}`);

  console.log("--------------------------");
  console.log("静的チェックを開始します🦈");

  console.log("テスト：");

  for (const checker of staticCheckers) {
    console.log(` □ ${checker.description}`);
    if (!checker.check(sampleCode)) {
      console.log(`静的チェックに失敗しました: ${checker.description} 🦈`);
      if (checker.message) {
        console.log(`メッセージ: ${checker.message}`);
      }
      process.exit(1);
    }
  }
  console.log("静的チェックに成功しました！🦈");

  console.log("--------------------------");
  console.log("動的チェックを開始します🦈");
  const out = runCode(sampleCode);
  console.log(`コードの出力: ${out}`);
  for (const checker of dynamicCheckers) {
    console.log(`動的チェック: ${checker.description}`);
    if (!checker.check(out)) {
      console.log(`動的チェックに失敗しました: ${checker.description} 🦈`);
      if (checker.message) {
        console.log(`メッセージ: ${checker.message}`);
      }
      process.exit(1);
    }
  }
  console.log("動的チェックに成功しました！🦈");

  console.log("--------------------------");
  console.log("すべてのチェックに成功しました！🦈");
}
