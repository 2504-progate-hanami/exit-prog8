import type { Problem } from "~/types/problem";

const procedure = document.createElement("div");
procedure.innerHTML =
  "<p>これはサンプルの手順です。<br>手順はHTMLで書くことができます。</p>";

export default {
  name: "サンプル問題",
  instructions: [
    {
      title: "関数とは",
      description:
        "関数は、特定の処理をまとめて実行するためのものです。関数を使うことで、コードを再利用しやすくなります。",
      // imgSrc: "/images/step1.png",
    },
    {
      title: "関数のつくりかた",
      description:
        "関数は、function キーワードを使って定義します。かっこの中には、引数を指定します。引数は、関数に渡す値のことです。関数の中では、return キーワードを使って、結果を返します。",
    },
  ],
  procedure,
  initialCode: `function add(a, b) {
    return a + b;
  }`,
  answerCode: `function add(a, b) {
    return a + b;
  }`,
  checkers: {
    static: [
      {
        description: "関数が定義されていることを確認する",
        check: (code: string) => /function\s+\w+\s*\(/.test(code),
        message: "関数を定義してください",
      },
      {
        description: "関数名が 'add' であることを確認する",
        check: (code: string) => /function\s+add\s*\(/.test(code),
        message: "関数名は 'add' にしてください",
      },
    ],
    dynamic: [
      {
        description: "add 関数が正しい結果を返すことを確認する",
        check: (out: string) => {
          const result = eval(out + "; add(2, 3);");
          return result === 5;
        },
        message: "結果が 5 になるようにしてください",
      },
    ],
  },
} as Problem;
