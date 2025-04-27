import type { Problem } from "~/types/problem";

const procedure6 = document.createElement("div");
procedure6.innerHTML = `
  <p>この問題では、JavaScriptの「オプショナルチェーン演算子（?.）」について学びます。</p>
  <p>オプショナルチェーンは、深くネストされたオブジェクトのプロパティに安全にアクセスするための便利な演算子です！</p>
  <p>この問題では、ユーザーデータの中から深い階層のプロパティを安全に取得する方法を学びましょう！</p>
`;

export default {
  name: "オプショナルチェーン（?.）を使ってみよう",
  instructions: [
    {
      title: "オプショナルチェーンとは？",
      description:
        "オプショナルチェーン演算子（?.）は、nullやundefinedの可能性があるオブジェクトのプロパティにアクセスする際にエラーを防ぐ機能です。存在しない場合は自動的にundefinedを返します。",
    },
    {
      title: "ネストされたデータにアクセスしよう",
      description:
        "与えられたユーザーデータから、user1とuser2それぞれのaddress.city.nameプロパティにオプショナルチェーンを使ってアクセスし、コンソールに出力してみましょう！",
    },
    {
      title: "ヒント",
      description:
        "通常のドット記法でアクセスするとnullやundefinedのプロパティでエラーになりますが、obj?.prop?.subpropのようにオプショナルチェーンを使うと安全にアクセスできます。",
    },
  ],
  procedure: procedure6,
  initialCode: `// ユーザーデータ（user2のaddressプロパティは存在しない）
const user1 = {
  name: "鈴木",
  age: 28,
  address: {
    city: {
      name: "東京",
      code: "100-0001"
    }
  }
};

const user2 = {
  name: "田中",
  age: 32
  // addressプロパティがない
};

// オプショナルチェーン（?.）を使って、
// 各ユーザーのaddress.city.nameプロパティにアクセスして
// コンソールに出力してください
`,
  answerCode: `// ユーザーデータ（user2のaddressプロパティは存在しない）
const user1 = {
  name: "鈴木",
  age: 28,
  address: {
    city: {
      name: "東京",
      code: "100-0001"
    }
  }
};

const user2 = {
  name: "田中",
  age: 32
  // addressプロパティがない
};

// オプショナルチェーンを使って安全にプロパティにアクセス
console.log(user1?.address?.city?.name); // "東京"
console.log(user2?.address?.city?.name); // undefined
`,
  checkers: {
    static: [
      {
        description: "オプショナルチェーン演算子が使われていることを確認する",
        check: (code: string) => /\?\./.test(code),
        message:
          "オプショナルチェーン演算子（?.）を使ってプロパティにアクセスしてください",
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
        check: (out: string) => /東京/.test(out) && /undefined/.test(out),
        message: "undefinedと'東京'の両方が出力されるようにしてください",
      },
    ],
  },
  nextProblemId: "lesson7",
} as Problem;
