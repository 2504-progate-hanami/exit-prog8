import type { WebContainer } from "@webcontainer/api";
import { atom } from "jotai";
import type * as monaco from "monaco-editor";
import type { Checker } from "./types/checker";
import type { Problem } from "./types/problem";
import type { Anomaly } from "./types/anomaly";
import { anomalies } from "./features/anomalypooler/anomalyPooler";
import { getNowProblemNumber } from "./utils/sessionStorage";

// ブラウザ環境でのみセッションストレージから初期値を取得
const getInitialProblemNumber = () => {
  if (typeof window !== "undefined") {
    return getNowProblemNumber();
  }
  return 0;
};

export const editorInstanceAtom =
  atom<monaco.editor.IStandaloneCodeEditor | null>(null);
export const editorContentAtom = atom<string>("// fallback message 😭");
export const webContainerAtom = atom<WebContainer | null>(null);
export const problemAtom = atom<Problem | null>(null);
export type CheckState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; checker?: Checker };
export const checkStateAtom = atom<CheckState>({ status: "idle" });
export const isDiffModeAtom = atom<boolean>(false);

export const isSlideModalAtom = atom<boolean>(true);
export const anomalyPoolAtom = atom<Anomaly[]>(anomalies);
export const isSubmitPopupOpenAtom = atom<boolean>(false);

export const nowAnomalyAtom = atom<Anomaly | null>(null);

// デバッグモード関連のatoms
export const isDebugModeAtom = atom<boolean>(false);
export const activeAnomalyAtom = atom<Anomaly | null>(null);
export const debugAnomaliesAtom = atom<Anomaly[]>([]);

// セッションストレージからの初期値を使用
export const nowProblemNumberAtom = atom<number>(getInitialProblemNumber());

export const handleRunAtom = atom<(() => Promise<void>) | null>(null);
