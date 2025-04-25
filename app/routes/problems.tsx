import { WebContainer } from "@webcontainer/api";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "react-router-dom";
import { problemAtom, webContainerAtom } from "~/atoms";
import { ConsoleUI } from "~/components/ConsoleUI";
import { EditorComponent } from "~/components/EditorComponent";
import { ProcedureComponent } from "~/components/procedureComponent";
import { files } from "~/files";

const Problems: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);

  const setWebcontainer = useSetAtom(webContainerAtom);
  const [problem, setProblem] = useAtom(problemAtom);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const problemModule = await import(`../resources/problems/${id}.ts`);
        setProblem(problemModule.default);
      } catch (err) {
        console.error("Error loading problem:", err);
        setError("その問題IDは存在しません。");
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const container = await WebContainer.boot();
        await container.mount(files.files);

        const installProcess = await container.spawn("npm", ["install"]);
        await installProcess.exit;

        const catCodeRunnerProcess = await container.spawn("cat", [
          "codeRunner.ts",
        ]);
        catCodeRunnerProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log("cat codeRunner.ts:", data);
            },
          }),
        );
        await catCodeRunnerProcess.exit;

        const tscProcess = await container.spawn("npx", [
          "tsc",
          "--outDir",
          ".",
          "codeRunner.ts",
          "check.ts",
        ]);

        const tscExitCode = await tscProcess.exit;
        if (tscExitCode !== 0) {
          console.log("コンパイルエラー:", tscExitCode);
          return;
        }
        console.log("WebContainerが起動しました");

        setWebcontainer(container);
      } catch (error) {
        if (error instanceof Error) {
          setError(`WebContainerの起動に失敗: ${error.message}`);
        }
      }
    })();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!problem) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <PanelGroup direction="horizontal" className="h-screen">
        <Panel defaultSize={20} minSize={15}>
          <ProcedureComponent />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={30} minSize={20}>
          <EditorComponent />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={40} minSize={20}>
              <ConsoleUI mode="console" problemId={1} />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={30} minSize={20}>
              <ConsoleUI mode="sample" problemId={2} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Problems;
