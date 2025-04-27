import type { Problem } from "~/types/problem";

const procedure2 = document.createElement("div");
procedure2.innerHTML = `
  <p>この問題では、JavaScriptの「テンプレートリテラル」について学びます。</p>
  <p>テンプレートリテラルは、バッククォート(\`)で囲んだ文字列で、<b>\\\${変数名}</b>の形で変数を埋め込める便利な機能です！</p>
  <p>この問題では、ユーザー情報を表示するメッセージをテンプレートリテラルを使って作成してみましょう！</p>
`;

export default {
  name: "テンプレートリテラルを使ってみよう",
  instructions: [
    {
      title: "テンプレートリテラルとは？",
      description:
        "テンプレートリテラルはバッククォート(`)で囲んだ文字列で、${変数名}の形で変数を埋め込むことができます。複数行の文字列も簡単に作れて便利です。",
    },
    {
      title: "プロフィールメッセージを作ろう",
      description:
        "与えられた名前(name)、年齢(age)、趣味(hobby)の変数を使って、「こんにちは、私の名前は〇〇です。〇〇歳で趣味は〇〇です。」というメッセージをテンプレートリテラルで作成しましょう！",
    },
    {
      title: "ヒント",
      description:
        "バッククォート(`)でテンプレートリテラルを作り、${name}のように変数を埋め込みます。最後にconsole.logで出力するのを忘れずに！",
    },
  ],
  procedure: procedure2,
  initialCode: `// プロフィール情報
const name = "田中";
const age = 28;
const hobby = "プログラミング";

// テンプレートリテラルを使って、
// 「こんにちは、私の名前は田中です。28歳で趣味はプログラミングです。」
// というメッセージを作成し、表示してください。
`,
  answerCode: `// プロフィール情報
const name = "田中";
const age = 28;
const hobby = "プログラミング";

// テンプレートリテラルを使ってメッセージを作成
console.log(\`こんにちは、私の名前は\${name}です。\${age}歳で趣味は\${hobby}です。\`);`,
  checkers: {
    static: [
      {
        description: "console.logが使われていることを確認する",
        check: (code: string) => /console\.log\(/.test(code),
        message: "console.logを使って結果を出力してください",
      },
      {
        description: "テンプレートリテラルが使われていることを確認する",
        check: (code: string) => /`.*\${.*}.*`/.test(code),
        message:
          "テンプレートリテラル(バッククォートと${変数}の形式)を使ってください",
      },
    ],
    dynamic: [
      {
        description: "正しいメッセージが出力されることを確認する",
        check: (out: string) =>
          /こんにちは、私の名前は田中です。28歳で趣味はプログラミングです。/.test(
            out,
          ),
        message:
          "出力が「こんにちは、私の名前は田中です。28歳で趣味はプログラミングです。」になるようにしてください",
      },
    ],
  },
  nextProblemId: "lesson3",
} as Problem;
