import type { Problem } from "~/types/problem";

const procedure3 = document.createElement("div");
procedure3.innerHTML = `
  <p>この問題では、JavaScriptの「分割代入」について学びます。</p>
  <p>分割代入は、配列やオブジェクトから値を取り出して変数に代入する便利な構文です！</p>
  <p>この問題では、ユーザー情報から必要なデータを分割代入を使って取り出してみましょう！</p>
`;

export default {
  name: "分割代入を使ってみよう",
  instructions: [
    {
      title: "分割代入とは？",
      description:
        "分割代入は配列やオブジェクトから複数の値を一度に取り出して変数に代入できる機能です。コードがシンプルで読みやすくなります。",
    },
    {
      title: "ユーザー情報を取り出そう",
      description:
        "与えられたuserオブジェクトから、name, age, locationの3つの情報を分割代入で取り出し、それぞれを表示してみましょう！",
    },
    {
      title: "ヒント",
      description:
        "オブジェクトの分割代入は const { プロパティ名1, プロパティ名2 } = オブジェクト; という形で書きます。取り出した値はconsole.logで出力してみましょう。",
    },
  ],
  procedure: procedure3,
  initialCode: `// ユーザー情報
const user = {
  name: "山田",
  age: 30,
  location: "東京",
  hobby: "プログラミング"
};

// 分割代入を使って name, age, location を取り出し、
// それぞれの値をconsole.logで表示してください。
`,
  answerCode: `// ユーザー情報
const user = {
  name: "山田",
  age: 30,
  location: "東京",
  hobby: "プログラミング"
};

// 分割代入を使ってプロパティを取り出す
const { name, age, location } = user;

// 取り出した値を表示
console.log(name);    // "山田"
console.log(age);     // 30
console.log(location); // "東京"`,
  checkers: {
    static: [
      {
        description: "分割代入が使われていることを確認する",
        check: (code: string) =>
          /const\s*{\s*\w+\s*,\s*\w+\s*,\s*\w+\s*}\s*=\s*user/.test(code),
        message:
          "オブジェクトの分割代入（const { name, age, location } = user）を使ってください",
      },
      {
        description: "console.logが使われていることを確認する",
        check: (code: string) => /console\.log\(/.test(code),
        message: "console.logを使って結果を出力してください",
      },
    ],
    dynamic: [
      {
        description: "正しい値が出力されることを確認する",
        check: (out: string) =>
          /山田/.test(out) && /30/.test(out) && /東京/.test(out),
        message:
          "name, age, locationの値が正しく出力されているか確認してください",
      },
    ],
  },
  nextProblemId: "lesson4",
} as Problem;
