/**
 * コードランナースクリプト：コードを WebContainer 上で実行するためのスクリプト
 * （このファイルは WebContainer 側で呼び出されます）
 *
 * 引数:
 * 1. コード: チェックするJavaScript/TypeScriptコード
 */

/**
 * コードを実行して出力を取得する関数。
 * @param code 実行するコード
 * @returns コードの実行結果 (console.log の出力と eval の結果を含む)
 */
export const runCode = (code: string): string => {
  let logOutput = "";

  // console.log を一時的にオーバーライド
  const originalConsoleLog = console.log;
  console.log = (...args: unknown[]) => {
    logOutput += args.map((arg) => String(arg)).join(" ") + "\n";
  };

  let evalOut = "";
  try {
    evalOut = eval(code) ?? "";
  } catch (e) {
    evalOut = `Error: ${e}`;
  }

  // console.log を元に戻す
  console.log = originalConsoleLog;

  return logOutput + evalOut + "\n__EOF__";
};

// ---------------------------------------------------
// 引数の受け取り
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("引数が不足しています。コードを指定してください。");
  process.exit(1);
}
const codeToRun = args[0];

// コードを実行
const result = runCode(codeToRun);

// 結果を出力
console.log(result);
