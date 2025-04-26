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
    evalOut = eval(code);
  } catch (e) {
    evalOut = `Error: ${e}`;
  }

  // console.log を元に戻す
  console.log = originalConsoleLog;

  return logOutput + evalOut;
};
