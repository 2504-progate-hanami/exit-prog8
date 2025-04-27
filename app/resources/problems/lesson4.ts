import type { Problem } from "~/types/problem";

const procedure4 = document.createElement("div");
procedure4.innerHTML = `
  <p>この問題では、JavaScriptの「スプレッド演算子(...)」について学びます。</p>
  <p>スプレッド演算子は、配列やオブジェクトの要素を展開する便利な構文です！</p>
  <p>この問題では、スプレッド演算子を使って配列を結合したり、オブジェクトをコピーしながら拡張してみましょう！</p>
`;

export default {
  name: "スプレッド演算子（...）を使ってみよう",
  instructions: [
    {
      title: "スプレッド演算子とは？",
      description:
        "スプレッド演算子(...)は、配列やオブジェクトの要素を展開する機能です。配列の結合やオブジェクトのコピーと拡張が簡単にできます。",
    },
    {
      title: "配列を結合してみよう",
      description:
        "与えられた2つの配列(fruits, vegetables)をスプレッド演算子を使って1つの新しい配列(foods)に結合してください！",
    },
    {
      title: "ヒント",
      description:
        "スプレッド演算子は三点リーダー(...)を使います。配列の場合は [...配列1, ...配列2] のように書くと要素を展開できます。console.logでfoods配列を出力してみましょう。",
    },
  ],
  procedure: procedure4,
  initialCode: `// 2つの配列
const fruits = ["りんご", "バナナ", "オレンジ"];
const vegetables = ["にんじん", "ブロッコリー", "トマト"];

// スプレッド演算子(...)を使って、fruitsとvegetablesを
// 1つの新しい配列(foods)に結合し、出力してください

`,
  answerCode: `// 2つの配列
const fruits = ["りんご", "バナナ", "オレンジ"];
const vegetables = ["にんじん", "ブロッコリー", "トマト"];

// スプレッド演算子を使って配列を結合
const foods = [...fruits, ...vegetables];

// 結合した配列を表示
console.log(foods);`,
  checkers: {
    static: [
      {
        description: "スプレッド演算子が使われていることを確認する",
        check: (code: string) => /\[\s*\.\.\./.test(code),
        message: "スプレッド演算子(...)を使って配列を結合してください",
      },
      {
        description: "console.logが使われていることを確認する",
        check: (code: string) => /console\.log\(/.test(code),
        message: "console.logを使って結果を出力してください",
      },
    ],
    dynamic: [
      {
        description: "正しく配列が結合されていることを確認する",
        check: (out: string) =>
          /りんご.*?バナナ.*?オレンジ.*?にんじん.*?ブロッコリー.*?トマト/.test(
            out,
          ),
        message:
          "fruitsとvegetablesの全ての要素が結合された配列を出力してください",
      },
    ],
  },
  nextProblemId: "5",
} as Problem;
