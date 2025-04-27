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

// モナコエディタの設定を管理するatom
interface MonacoEditorConfig {
  fontSize?: number;
  tabSize?: number;
  theme?: string;
  lineHeight?: number;
  fontFamily?: string;
  // 他にも必要な設定があれば追加
}

// デフォルト設定
const defaultEditorConfig: MonacoEditorConfig = {
  fontSize: 14,
  tabSize: 2,
  theme: "vs-dark",
  lineHeight: 20,
  fontFamily: "monospace",
};

// 現在の設定を保持するatom
export const monacoEditorConfigAtom =
  atom<MonacoEditorConfig>(defaultEditorConfig);

// 設定をリセットする関数を含むatom
export const resetEditorConfigAtom = atom(
  (get) => get(monacoEditorConfigAtom),
  (get, set) => {
    set(monacoEditorConfigAtom, defaultEditorConfig);
  },
);

// 特定の設定だけを一時的に変更し、指定時間後に元に戻すための関数を含むatom
export const temporaryEditorConfigAtom = atom(
  (get) => get(monacoEditorConfigAtom),
  (get, set, config: MonacoEditorConfig & { durationMs?: number }) => {
    const { durationMs, ...editorConfig } = config;
    const currentConfig = get(monacoEditorConfigAtom);

    // 現在の設定をバックアップ
    const backupConfig = { ...currentConfig };

    // 新しい設定を適用
    set(monacoEditorConfigAtom, { ...currentConfig, ...editorConfig });

    // 指定時間が設定されていれば、その後に元に戻す
    if (durationMs && durationMs > 0) {
      setTimeout(() => {
        set(monacoEditorConfigAtom, backupConfig);
      }, durationMs);
    }
  },
);
export const handleRunAtom = atom<(() => Promise<void>) | null>(null);
