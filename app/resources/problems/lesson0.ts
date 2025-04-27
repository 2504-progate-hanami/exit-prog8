import type { Problem } from "~/types/problem";

const procedure = document.createElement("div");
procedure.innerHTML =
  "<p>この問題では、<code>console.log</code> を使って 'Hello world' を出力するプログラムを書いてみましょう！</p>";

export default {
  name: "Hello World 問題",
  instructions: [
    {
      title: "console.log とは",
      description:
        "console.log は、JavaScriptでコンソールにメッセージを出力するための関数です。デバッグや確認に便利な機能です！",
      imgSrc: "/ninja-1.png",
    },
    {
      title: "Hello world を出力しよう",
      description:
        "プログラムの基本中の基本！console.log を使って 'Hello world' を出力してみましょう！",
      imgSrc: "/1-2.png",
    },
  ],
  procedure,
  initialCode: `// ここにコードを書いてください！`,
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
  nextProblemId: "lesson1",
} as Problem;
