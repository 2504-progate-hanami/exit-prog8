import { Console } from "console";
import { Writable } from "stream";

/**
 * コードを実行して出力を取得する関数。
 * @param code 実行するコード
 * @returns コードの実行結果 (console.log の出力と eval の結果を含む)
 */
export const runCode = (code: string): string => {
  let logOutput = "";
  const logStream = new Writable({
    write(chunk, encoding, callback) {
      logOutput += chunk.toString();
      callback();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const customConsole = new Console({ stdout: logStream, stderr: logStream });

  let evalResult: unknown;
  try {
    evalResult = eval(`(function(console){${code}})(customConsole)`);
  } catch (e) {
    evalResult = `Error: ${e}`;
  }

  return (
    logOutput + (typeof evalResult !== "undefined" ? String(evalResult) : "")
  );
};
