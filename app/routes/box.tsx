import type { JSX } from "react";
import { useState, useEffect, useRef } from "react";
import { WebContainer } from "@webcontainer/api";
import { files } from "~/files";
import "@xterm/xterm/css/xterm.css";

import { Terminal } from "@xterm/xterm";

export default function Box(): JSX.Element {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);
  const [, setTerminal] = useState<Terminal | null>(null);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tsCode, setTsCode] = useState<string>(
    `// TypeScriptのコードを書いてみよう🦈
const message: string = "Hello TypeScript World! 🦈";
console.log(message);

class Shark {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    swim(): string {
        return \`\${this.name}がスイスイ泳いでる🦈\`;
    }
}

const shark = new Shark("サメちゃん");
console.log(shark.swim());

export {};`,
  );

  useEffect(() => {
    async function bootWebContainer() {
      try {
        const terminalInstance = new Terminal({
          convertEol: true,
          scrollback: 2000,
        });
        setTerminal(terminalInstance);

        if (terminalRef.current) {
          terminalInstance.open(terminalRef.current);
        }

        const container = await WebContainer.boot();
        await container.mount(files.files);

        // パッケージをインストール
        setOutput("📦 TypeScriptをインストール中...\n");
        const installProcess = await container.spawn("npm", ["install"]);

        // インストールの出力を取得してリアルタイム表示
        let installOutput = "";
        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              installOutput += data;
              setOutput((prev) => prev + data); // リアルタイムで出力を表示
              terminalInstance.write(data); // ターミナルにも表示
            },
          }),
        );

        const installExitCode = await installProcess.exit;
        if (installExitCode !== 0) {
          console.error("インストールエラー:", installOutput);
          throw new Error(
            `インストールに失敗しました。終了コード: ${installExitCode}`,
          );
        }

        setOutput((prev) => prev + "✅ TypeScriptのインストール完了!\n");

        setOutput((prev) => prev + "🔄 codeRunner.tsをコンパイル中...\n");
        const tscProcess = await container.spawn("npx", [
          "tsc",
          "codeRunner.ts",
        ]);

        let tscOutput = "";
        tscProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              tscOutput += data;
              setOutput((prev) => prev + data);
              terminalInstance.write(data); // ターミナルにも表示
            },
          }),
        );

        const tscExitCode = await tscProcess.exit;
        if (tscExitCode !== 0) {
          console.error("コンパイルエラー:", tscOutput);
          throw new Error(
            `codeRunner.tsのコンパイルに失敗しました。終了コード: ${tscExitCode}\n${tscOutput}`,
          );
        }

        setOutput((prev) => prev + "✅ codeRunner.tsのコンパイル完了!\n");
        setWebcontainer(container);

        // 対話型シェルを起動
        const shellProcess = await container.spawn("jsh", {
          terminal: {
            cols: terminalInstance.cols,
            rows: terminalInstance.rows,
          },
        });

        // シェルプロセスの出力をターミナルに表示
        shellProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              terminalInstance.write(data);
            },
          }),
        );

        // ターミナルからの入力をシェルプロセスに渡す
        const input = shellProcess.input.getWriter();
        terminalInstance.onData((data) => {
          input.write(data);
        });

        // ターミナルのサイズ変更時にシェルのサイズも変更
        terminalInstance.onResize(({ cols, rows }) => {
          shellProcess.resize({
            cols,
            rows,
          });
        });
      } catch (error) {
        console.error("WebContainerの起動に失敗:", error);
        setOutput((prev) => prev + `❌ エラー: ${error}\n`);
      }
    }
    bootWebContainer();
  }, []);

  const runTypeScript = async () => {
    if (!webcontainer) return;
    setLoading(true);
    setOutput("");

    try {
      await webcontainer.fs.writeFile("sample.ts", tsCode);

      setOutput((prev) => prev + "📝 TypeScriptファイルを作成しました\n");

      setOutput((prev) => prev + "🔄 コンパイル中...\n");
      const tscProcess = await webcontainer.spawn("npx", ["tsc", "sample.ts"]);

      let tscOutput = "";
      tscProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            tscOutput += data;
          },
        }),
      );

      const tscExitCode = await tscProcess.exit;
      if (tscExitCode !== 0) {
        setOutput((prev) => prev + `❌ コンパイルエラー:\n${tscOutput}\n`);
        setLoading(false);
        return;
      }

      setOutput((prev) => prev + "✅ コンパイル成功!\n");

      setOutput((prev) => prev + "🚀 実行中...\n");

      const nodeProcess = await webcontainer.spawn("node", [
        "-e",
        `
                const { runCode } = require('./codeRunner.js');
                const fs = require('fs');
                const code = fs.readFileSync('sample.js', 'utf-8');
                console.log(runCode(code));
            `,
      ]);

      nodeProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            setOutput((prev) => prev + data);
          },
        }),
      );

      await nodeProcess.exit;
      setOutput((prev) => prev + "\n✨ 実行完了!\n");
    } catch (error) {
      console.error("実行エラー:", error);
      setOutput((prev) => prev + `\n❌ エラー: ${error}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="text-2xl font-bold text-gray-800 mb-4">
        TypeScript実行環境{" "}
        {webcontainer
          ? "(WebContainer Ready! 🦈)"
          : "(Loading WebContainer...)"}
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4">
        {/* コードエディタ */}
        <div className="w-full md:w-1/2">
          <div className="mb-2 font-semibold">TypeScriptコード:</div>
          <textarea
            value={tsCode}
            onChange={(e) => setTsCode(e.target.value)}
            className="w-full h-80 p-4 font-mono text-sm bg-gray-800 text-gray-100 rounded shadow-md"
            placeholder="TypeScriptのコードを入力してください..."
          />

          <button
            onClick={runTypeScript}
            disabled={!webcontainer || loading}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "実行中..." : "コンパイルして実行 🦈"}
          </button>
        </div>

        {/* 出力エリア */}
        <div className="w-full md:w-1/2">
          <div className="mb-2 font-semibold">出力:</div>
          <div className="w-full h-80 p-4 bg-black text-green-400 font-mono rounded shadow-md overflow-auto">
            <pre>{output || "実行結果がここに表示されます..."}</pre>
          </div>
        </div>
      </div>

      <div className="mt-4 text-gray-600 text-sm">
        ヒント:
        TypeScriptファイルをコンパイルして実行するよ。型チェックも動作するから、エラーがあれば教えるね🦈
      </div>

      <div className="w-full max-w-4xl mt-6">
        <div className="mb-2 font-semibold">対話型ターミナル:</div>
        <div
          ref={terminalRef}
          className="terminal w-full h-60 bg-black rounded shadow-md overflow-hidden p-2"
        ></div>
        <div className="mt-1 text-xs text-gray-500">
          ※
          ここでシェルコマンドが使えるよ！ファイル操作したり、npmコマンド実行したりできるよ🦈
        </div>
      </div>
    </div>
  );
}
