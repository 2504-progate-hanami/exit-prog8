import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { ConsoleUI } from "~/components/ConsoleUI";
import { EditorComponent } from "~/components/EditorComponent";
import { ProcedureComponent } from "~/components/procedureComponent"; // 名前付きエクスポートとしてインポート

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
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
            <Panel defaultSize={50} minSize={20}>
              <ConsoleUI mode="console" problemId={1} />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={50} minSize={20}>
              <ConsoleUI mode="sample" problemId={2} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
