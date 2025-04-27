import type { Problem } from "~/types/problem";

const procedure7 = document.createElement("div");
procedure7.innerHTML = `
  <p>この問題では、これまで学んだ「三項演算子」「テンプレートリテラル」「分割代入」を組み合わせて使います！</p>
  <p>JavaScriptの便利な構文を活用して、より効率的で読みやすいコードを書く練習をしましょう！</p>
`;

export default {
  name: "JavaScript構文まとめ（レッスン1-3）",
  instructions: [
    {
      title: "これまでのおさらい",
      description:
        "これまで「三項演算子」「テンプレートリテラル」「分割代入」という便利な構文を学びました。今回はこれらを組み合わせて使います！",
    },
    {
      title: "ユーザー情報の表示",
      description:
        "与えられたユーザーオブジェクトから必要な情報を分割代入で取り出し、ステータスに応じて表示するメッセージを三項演算子とテンプレートリテラルを使って作成しましょう！",
    },
    {
      title: "ヒント",
      description:
        "1. まず分割代入でオブジェクトからプロパティを取り出します\n2. 三項演算子でステータスをチェックします\n3. テンプレートリテラルでメッセージを作成します",
    },
  ],
  procedure: procedure7,
  initialCode: `// ユーザー情報
const user = {
  name: "佐藤",
  age: 28,
  status: "active",
  lastLogin: "2025/04/20"
};

// 以下の3つの構文を使ってコードを書いてください：
// 1. 分割代入: userから name, status, lastLogin を取り出す


// 2. 三項演算子: statusが"active"なら"アクティブ"、そうでなければ"非アクティブ"と表示


// 3. テンプレートリテラル: "佐藤さんは現在アクティブです。最終ログイン: 2025/04/20" のようなメッセージを作成


// 結果をconsole.logで出力してください
`,
  answerCode: `// ユーザー情報
const user = {
  name: "佐藤",
  age: 28,
  status: "active",
  lastLogin: "2025/04/20"
};

// 1. 分割代入でプロパティを取り出す
const { name, status, lastLogin } = user;

// 2&3. 三項演算子とテンプレートリテラルでメッセージを作成
const statusText = status === "active" ? "アクティブ" : "非アクティブ";
const message = \`\${name}さんは現在\${statusText}です。最終ログイン: \${lastLogin}\`;

// 結果を出力
console.log(message); // "佐藤さんは現在アクティブです。最終ログイン: 2025/04/20"`,
  checkers: {
    static: [
      {
        description: "分割代入が使われていることを確認する",
        check: (code: string) =>
          /const\s*{\s*\w+\s*,\s*\w+\s*,\s*\w+\s*}\s*=\s*user/.test(code),
        message: "分割代入を使ってuserからプロパティを取り出してください",
      },
      {
        description: "三項演算子が使われていることを確認する",
        check: (code: string) => /\?.*:/.test(code),
        message: "三項演算子を使ってstatusに応じた表示を切り替えてください",
      },
      {
        description: "テンプレートリテラルが使われていることを確認する",
        check: (code: string) => /`.*\${.*}.*`/.test(code),
        message: "テンプレートリテラルを使ってメッセージを作成してください",
      },
      {
        description: "console.logが使われていることを確認する",
        check: (code: string) => /console\.log\(/.test(code),
        message: "console.logを使って結果を出力してください",
      },
    ],
    dynamic: [
      {
        description: "正しいメッセージが出力されることを確認する",
        check: (out: string) =>
          /佐藤さんは現在アクティブです。最終ログイン: 2025\/04\/20/.test(out),
        message:
          "「佐藤さんは現在アクティブです。最終ログイン: 2025/04/20」のようなメッセージを出力してください",
      },
    ],
  },
  nextProblemId: "lesson8",
} as Problem;
