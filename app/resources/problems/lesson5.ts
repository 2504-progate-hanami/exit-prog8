import type { Problem } from "~/types/problem";

const procedure5 = document.createElement("div");
procedure5.innerHTML = `
  <p>この問題では、JavaScriptの「Null合体演算子（??）」について学びます。</p>
  <p>Null合体演算子は、左辺がnullまたはundefinedの場合に右辺の値を返す便利な演算子です！</p>
  <p>この問題では、ユーザーオブジェクトからnameプロパティを安全に取得する方法を学びましょう！</p>
`;

export default {
  name: "Null合体演算子（??）を使ってみよう",
  instructions: [
    {
      title: "Null合体演算子とは？",
      description:
        "Null合体演算子（??）は、左側の値がnullまたはundefinedの場合に右側の値を返す演算子です。falseや0、空文字列などはそのまま返すため、OR演算子（||）よりも細かい制御ができます。",
    },
    {
      title: "ユーザー名を安全に取得しよう",
      description:
        "与えられたuserオブジェクトのnameプロパティがnullまたはundefinedの場合、「ゲスト」というデフォルト値を使うコードをNull合体演算子を使って書いてみましょう！",
    },
    {
      title: "ヒント",
      description:
        "const displayName = user.name ?? defaultValue の形で書くと、user.nameがnullまたはundefinedのときだけdefaultValueが使われます。",
    },
  ],
  procedure: procedure5,
  initialCode: `// ユーザーオブジェクト（nameプロパティがnullの場合も）
const user = {
  name: null,
  age: 25,
  isActive: true
};

// username という変数を定義してください
// 値は user.name を代入します
// user.name が null/undefined の場合は、
// デフォルト値として「ゲスト」を代入してください

// 設定した結果を出力してください
`,
  answerCode: `// ユーザーオブジェクト（nameプロパティがnullの場合も）
const user = {
  name: null,
  age: 25,
  isActive: true
};

// Null合体演算子を使ってデフォルト値を設定
const displayName = user.name ?? "ゲスト";

// 結果を出力
console.log(displayName); // "ゲスト"

// 値が設定されている場合の例
const user2 = {
  name: "田中",
  age: 30,
  isActive: true
};
const displayName2 = user2.name ?? "ゲスト";
console.log(displayName2); // "田中"`,
  checkers: {
    static: [
      {
        description: "Null合体演算子が使われていることを確認する",
        check: (code: string) => /\?\?/.test(code),
        message: "Null合体演算子（??）を使ってデフォルト値を設定してください",
      },
      {
        description: "console.logが使われていることを確認する",
        check: (code: string) => /console\.log\(/.test(code),
        message: "console.logを使って結果を出力してください",
      },
    ],
    dynamic: [
      {
        description: "正しいデフォルト値が設定されていることを確認する",
        check: (out: string) => /ゲスト/.test(out),
        message:
          "user.nameがnullの時は「ゲスト」が出力されるようにしてください",
      },
    ],
  },
  nextProblemId: "6",
} as Problem;
