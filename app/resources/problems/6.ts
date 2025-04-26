import type { Problem } from "~/types/problem";

const procedure = document.createElement("div");
procedure.innerHTML =
  "<p>この問題では、<code>console.log</code> を使って 'Hello world' を出力するプログラムを書いてみよう！</p>";

export default {
  name: "Hello World 問題２です",
  instructions: [
    {
      title: "console.log とは",
      description:
        "console.log は、JavaScriptでコンソールにメッセージを出力するための関数やね～。デバッグや確認に便利！",
    },
    {
      title: "Hello world を出力しよう",
      description:
        "プログラムの基本中の基本！<code>console.log</code> を使って 'Hello world' を出力してみよう～",
    },
  ],
  procedure,
  initialCode: `// ここにコードを書いてね！`,
  answerCode: `console.log("Hello world");`,
  checkers: {
    static: [
      {
        description: "console.log が使われていることを確認する",
        check: (code: string) => /console\.log\(/.test(code),
        message: "console.log を使ってください",
      },
    ],
    dynamic: [
      {
        description: "'Hello world' が出力されることを確認する",
        check: (out: string) => /Hello world/.test(out),
        message: "'Hello world' を出力してください",
      },
    ],
  },
  nextProblemId: "7",
} as Problem;
