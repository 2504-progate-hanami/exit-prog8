import type { Problem } from "~/types/problem";

const procedure1 = document.createElement("div");
procedure1.innerHTML = `
  <p>この問題では、JavaScript の三項演算子（条件演算子）について学びます。</p>
  <p>三項演算子は <b>条件式 ? 真の場合の値 : 偽の場合の値</b> という構文で、if-else文を短く書くことができる便利な機能です！</p>
  <p>この問題では、与えられた年齢(age)に応じてメッセージを出力するプログラムを三項演算子を使って書いてみよう！</p>
`;

export default {
  name: "三項演算子マスター",
  instructions: [
    {
      title: "三項演算子とは？",
      description:
        "三項演算子は条件式 ? 真の場合の値 : 偽の場合の値 という形で書きます。if-elseより短く書けるため便利です。",
      imgSrc: "/ninja-1.png",
    },
    {
      title: "年齢チェッカーを作ろう",
      description:
        "age変数の値が20以上なら「成人です」、そうでなければ「未成年です」と出力するプログラムを三項演算子を使って書いてみましょう！",
    },
    {
      title: "ヒント",
      description:
        "まず条件（age >= 20）を書いて、?の後に条件が真の時の値、:の後に偽の時の値を書きます。それをconsole.logで出力しましょう。",
    },
  ],
  procedure: procedure1,
  initialCode: `// 年齢の値
const age = 18;

// 三項演算子を使って、ageが20以上なら「成人です」、
// そうでなければ「未成年です」と出力しよう！
`,
  answerCode: `// 年齢の値
const age = 18;

// 三項演算子を使って条件分岐
console.log(age >= 20 ? "成人です" : "未成年です");`,
  checkers: {
    static: [
      {
        description: "三項演算子が使われていることを確認する",
        check: (code: string) => /\?.*:/.test(code),
        message: "三項演算子（条件 ? 値1 : 値2）を使ってください",
      },
      {
        description: "console.logが使われていることを確認する",
        check: (code: string) => /console\.log\(/.test(code),
        message: "console.logを使って結果を出力してください",
      },
    ],
    dynamic: [
      {
        description: "年齢に応じた正しいメッセージが出力されることを確認する",
        check: (out: string) => /未成年です/.test(out),
        message: "ageが18の時は「未成年です」と出力されるはずです",
      },
    ],
  },
  nextProblemId: "2",
} as Problem;
