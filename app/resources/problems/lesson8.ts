import type { Problem } from "~/types/problem";

const procedure8 = document.createElement("div");
procedure8.innerHTML = `
  <p>この問題では、レッスン4〜6で学んだ「スプレッド演算子」「Null合体演算子」「オプショナルチェーン」の使い方を復習します。</p>
  <p>これら3つの構文を組み合わせて、ユーザー情報を取得・編集する実践的なコードを書いてみましょう！</p>
`;

export default {
  name: "レッスン4-6の復習",
  instructions: [
    {
      title: "これまでの復習",
      description:
        "「スプレッド演算子」「Null合体演算子」「オプショナルチェーン」という3つの便利な構文を組み合わせて使います。",
    },
    {
      title: "ユーザー情報を取得・更新する",
      description:
        "与えられたユーザー情報を操作するコードを書きます。配列の結合、オブジェクトのプロパティ確認、そして安全にネストされたプロパティへアクセスするテクニックを使いましょう！",
    },
    {
      title: "ヒント",
      description:
        "1. スプレッド演算子で配列を結合\n2. Null合体演算子で安全にデフォルト値を設定\n3. オプショナルチェーンでネストされたプロパティにアクセス",
    },
  ],
  procedure: procedure8,
  initialCode: `// いくつかのデータ配列とオブジェクト
const team1 = ["田中", "佐藤"];
const team2 = ["山田", "鈴木"];

// 設定情報（nullの値あり）
const settings = {
  darkMode: null,
  fontSize: 16
};

// ユーザー情報（ネストされたオブジェクト）
const user = {
  name: "高橋",
  // addressプロパティがない
};

// 下記の3つのタスクを実行するコードを書いてください：

// 1. スプレッド演算子(...)を使って、team1とteam2を結合した
//    新しい配列「allMembers」を作成し、出力する

// 2. Null合体演算子(??)を使って、settings.darkModeの値がnullの場合は
//    "light"をデフォルト値として使用し、出力する

// 3. オプショナルチェーン(?.)を使って、user.address.cityにアクセスし、
//    存在しない場合はundefinedを返すようにして、その結果を出力する
`,
  answerCode: `// いくつかのデータ配列とオブジェクト
const team1 = ["田中", "佐藤"];
const team2 = ["山田", "鈴木"];

// 設定情報（nullの値あり）
const settings = {
  darkMode: null,
  fontSize: 16
};

// ユーザー情報（ネストされたオブジェクト）
const user = {
  name: "高橋",
  // addressプロパティがない
};

// 1. スプレッド演算子を使って配列を結合
const allMembers = [...team1, ...team2];
console.log("チームメンバー全員:", allMembers);

// 2. Null合体演算子でデフォルト値を設定
const theme = settings.darkMode ?? "light";
console.log("テーマ設定:", theme);

// 3. オプショナルチェーンで安全にプロパティにアクセス
const city = user?.address?.city;
console.log("都市情報:", city);`,
  checkers: {
    static: [
      {
        description: "スプレッド演算子が使われていることを確認する",
        check: (code: string) => /\[\s*\.\.\./.test(code),
        message: "スプレッド演算子(...)を使って配列を結合してください",
      },
      {
        description: "Null合体演算子が使われていることを確認する",
        check: (code: string) => /\?\?/.test(code),
        message: "Null合体演算子(??)を使ってデフォルト値を設定してください",
      },
      {
        description: "オプショナルチェーンが使われていることを確認する",
        check: (code: string) => /\?\./.test(code),
        message:
          "オプショナルチェーン(?.)を使って安全にプロパティにアクセスしてください",
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
          /田中/.test(out) &&
          /佐藤/.test(out) &&
          /山田/.test(out) &&
          /鈴木/.test(out),
        message: "team1とteam2の全メンバーが結合された配列を出力してください",
      },
      {
        description: "正しいデフォルト値が設定されていることを確認する",
        check: (out: string) => /light/.test(out),
        message: "darkModeがnullの場合は'light'を使用してください",
      },
      {
        description: "オプショナルチェーンが正しく動作していることを確認する",
        check: (out: string) => /undefined/.test(out),
        message:
          "存在しないプロパティへのアクセスはundefinedを返すようにしてください",
      },
    ],
  },
  nextProblemId: "congrats",
} as Problem;
