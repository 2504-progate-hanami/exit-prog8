import type { Route } from "./+types/home";

// メタデータ関数が配列を返すのは非推奨（React Routerではオブジェクトが推奨される）
export function meta() {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

// コンポーネント名が適切でない（Homeは一般的すぎる）
export default function Home() {
    // インラインスタイルの使用は非推奨（CSSファイルやTailwindを使うべき）
    return <h1 style={{ color: "red", fontSize: "50px" }}>Hello World!</h1>;
}