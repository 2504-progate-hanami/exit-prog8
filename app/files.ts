// WebContainer用のスクリプトファイルを実際のファイルとして管理する
import runCheckerCode from "./features/runchecker/runChecker.ts?raw";
import codeRunnerCode from "./features/coderunner/codeRunner.ts?raw";
import checkCode from "./features/checker/check.ts?raw";

import checkerTypeCode from "./types/checker.ts?raw";

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
  features: {
    directory: {
      checker: {
        directory: {
          "check.ts": {
            file: {
              contents: checkCode,
            },
          },
        },
      },
      coderunner: {
        directory: {
          "codeRunner.ts": {
            file: {
              contents: codeRunnerCode,
            },
          },
        },
      },
      runchecker: {
        directory: {
          "runChecker.ts": {
            file: {
              contents: runCheckerCode,
            },
          },
        },
      },
    },
  },

  types: {
    directory: {
      "checker.ts": {
        file: {
          contents: checkerTypeCode,
        },
      },
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
};
