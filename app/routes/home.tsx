import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { ConsoleUI } from "~/components/ConsoleUI";
import { EditorComponent } from "~/components/EditorComponent";
import { ProcedureComponent } from "~/components/procedureComponent";
import { useEffect } from "react";
import { webContainerAtom } from "~/atoms";
import { useAtom } from "jotai";
import { WebContainer } from "@webcontainer/api";
import { files } from "~/files";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [, setWebcontainer] = useAtom(webContainerAtom);

  useEffect(() => {
    async function bootWebContainer() {
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
        console.error("WebContainerの起動に失敗:", error);
      }
    }
    bootWebContainer();
  }, []);

  return (
    <div>
      <a href="/problems/1">Go to Problem 1</a>
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
              <ConsoleUI mode="console" />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={30} minSize={20}>
              <ConsoleUI mode="sample" />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
