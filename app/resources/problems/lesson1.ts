import type { Problem } from "~/types/problem";

const procedure1 = document.createElement("div");
procedure1.innerHTML = `
  <p>この問題では、ユーザーの年齢に応じて異なるメッセージをコンソールに出力するプログラムを作成します。</p>
  <p>JavaScript の三項演算子を使って、条件分岐をより簡潔に記述する方法を学びましょう！</p>
`;

export const problem1 = {
  name: "年齢に応じたメッセージ表示",
  instructions: [
    {
      title: "1. 変数の準備",
      description: `
        まず、ユーザーの年齢を保存するための変数 <code>userAge</code> を宣言し、あなたの好きな年齢（例：<code>20</code>）を代入してください。
        <pre><code>let userAge = 20;</code></pre>
        後でこの値を変更して、プログラムの動作を確認してみましょう。
      `,
    },
    {
      title: "2. 三項演算子の導入",
      description: `
        次に、条件に応じて異なる値を返すことができる便利な演算子、**三項演算子** を使います。
        基本的な構文は以下の通りです。
        <pre><code>条件 ? 真の場合の値 : 偽の場合の値</code></pre>
        この問題では、<code>userAge</code> が 18 歳以上かどうかを条件とし、真（18歳以上）の場合は <code>'成人です'</code>、偽（18歳未満）の場合は <code>'未成年です'</code> という文字列を変数 <code>message</code> に代入します。
        以下のコードを <code>// ここにコードを書いてね！</code> の下に記述してみてください。
        <pre><code>let message = userAge >= 18 ? '成人です' : '未成年です';</code></pre>
      `,
    },
    {
      title: "3. 結果の出力",
      description: `
        最後に、作成したメッセージをコンソールに出力して結果を確認しましょう。
        JavaScript でコンソールにメッセージを表示するには、<code>console.log()</code> 関数を使います。
        以下のコードを先ほどのコードの下に記述してください。
        <pre><code>console.log(message);</code></pre>
        これでプログラムは完成です！<code>userAge</code> の値を色々変えて、出力されるメッセージが変わることを確認してみてください。
      `,
    },
  ],
  procedure: procedure1,
  initialCode: `let userAge = 20; // 年齢を自由に設定してください
let message;

// ここにコードを書いてね！`,
  answerCode: `let userAge = 20;
let message = userAge >= 18 ? '成人です' : '未成年です';
console.log(message);`,
  checkers: {
    static: [
      {
        description: "三項演算子がコードに含まれていることを確認します",
        check: (code: string) => code.includes("?") && code.includes(":"),
        message: "三項演算子を使って条件分岐を記述してください。",
      },
      {
        description: "console.log 関数が使われていることを確認します",
        check: (code: string) => /console\.log\(/.test(code),
        message: "結果をコンソールに出力してください。",
      },
    ],
    dynamic: [
      {
        description:
          "'成人です' または '未成年です' のいずれかが出力されることを確認します",
        check: (out: string) => /成人です|未成年です/.test(out),
        message:
          "'成人です' または '未成年です' のいずれかを出力してください。",
      },
      {
        description: "'成人です' が出力されることを確認します",
        check: (out: string) => /成人です/.test(out),
        message:
          "18歳以上の年齢を設定した場合、'成人です' と出力されるはずです。",
      },
      {
        description: "'未成年です' が出力されることを確認します",
        check: (out: string) => /未成年です/.test(out),
        message:
          "18歳未満の年齢を設定した場合、'未成年です' と出力されるはずです。",
      },
    ],
  },
  nextProblemId: "problem2",
} as Problem;
