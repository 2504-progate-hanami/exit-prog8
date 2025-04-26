// WebContainer用のスクリプトファイルを実際のファイルとして管理する
import codeRunnerCode from "./features/coderunner/codeRunner.ts?raw";

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
  "codeRunner.ts": {
    file: {
      contents: codeRunnerCode,
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
