import { WebContainer } from "@webcontainer/api";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState, useCallback } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "react-router-dom";
import {
  anomalyPoolAtom,
  problemAtom,
  webContainerAtom,
  isSlideModalAtom,
  isDebugModeAtom,
} from "~/atoms";
import { ConsoleUI } from "~/components/ConsoleUI";
import { DebugModePopup } from "~/components/DebugModePopup";
import { EditorComponent } from "~/components/EditorComponent";
import { ProcedureComponent } from "~/components/procedureComponent";
import { Slide } from "~/components/slide";
import { files } from "~/files";
import {
  getRandomAnomalies,
  triggerAnomaly,
} from "~/features/anomalypooler/anomalyPooler";

const Problems: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);

  const setWebcontainer = useSetAtom(webContainerAtom);
  const [problem, setProblem] = useAtom(problemAtom);
  const [isSlideModal] = useAtom(isSlideModalAtom);
  const setAnomalyPool = useSetAtom(anomalyPoolAtom);
  const [isDebugMode, setIsDebugMode] = useAtom(isDebugModeAtom);

  // キーボードショートカットの処理
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // 開発者モード用の隠しキーボードショートカット (Ctrl+Alt+/)
      if (event.ctrlKey && event.altKey && event.key === "/") {
        event.preventDefault();
        setIsDebugMode(!isDebugMode);
        console.log(`デバッグモード: ${!isDebugMode ? "ON" : "OFF"}`);
      }
    },
    [isDebugMode, setIsDebugMode],
  );

  // キーボードイベントのリスナー設定
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
        await container.mount(files);

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

    // 異変の抽選と設定処理
    if (triggerAnomaly()) {
      const selectedAnomalies = getRandomAnomalies(1);
      setAnomalyPool(selectedAnomalies);

      // 選択した異変を実行
      selectedAnomalies.forEach((anomaly) => {
        anomaly.execute();
      });
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!problem) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] overflow-hidden p-0 m-0">
      {isSlideModal && <Slide key={`slide-${Date.now()}`} id={1} />}
      <PanelGroup
        direction="horizontal"
        className="flex-1 w-full overflow-hidden"
      >
        <Panel defaultSize={40} minSize={15}>
          <ProcedureComponent />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={70} minSize={20}>
          <EditorComponent />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={40} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={10}>
              <ConsoleUI mode="console" />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={10}>
              <ConsoleUI mode="sample" />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>

      {/* デバッグモードポップアップ */}
      <DebugModePopup />
    </div>
  );
};

export default Problems;
