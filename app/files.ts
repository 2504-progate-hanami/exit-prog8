const runCode = `
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
        evalResult = eval(\`(function(console){\${code}})(customConsole)\`);
    } catch (e) {
        evalResult = \`Error: \${e}\`;
    }
    
    return (
        logOutput + (typeof evalResult !== "undefined" ? String(evalResult) : "")
    );
};
`;

const check = `
import { runCode } from "./codeRunner";

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
`;

const packageJson = `{
  "name": "ts-environment",
  "version": "1.0.0",
  "description": "TypeScript",
  "scripts": {
    "tsc": "tsc",
    "start": "node"
  },
  "dependencies": {
    "typescript": "^5.7.2",
    "@types/node": "^22.14.1"
  }
}`;

const tsConfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist"
  }
}`;

export const files = {
  files: {
    "codeRunner.ts": {
      file: {
        contents: runCode,
      },
    },
    "check.ts": {
      file: {
        contents: check,
      },
    },
    "package.json": {
      file: {
        contents: packageJson,
      },
    },
    "tsconfig.json": {
      file: {
        contents: tsConfig,
      },
    },
  },
};
