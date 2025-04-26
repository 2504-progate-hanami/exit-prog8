import type { WebContainer } from "@webcontainer/api";
import { atom } from "jotai";
import type * as monaco from "monaco-editor";
import type { Checker } from "./types/checker";
import type { Problem } from "./types/problem";

export const editorInstanceAtom =
  atom<monaco.editor.IStandaloneCodeEditor | null>(null);

export const editorContentAtom = atom<string>(
  '// "Hello, World!"とコンソールに出力するコードを書いてください\n',
);

export const webContainerAtom = atom<WebContainer | null>(null);

export const problemAtom = atom<Problem | null>(null);

// チェック結果を管理するための atom
export type CheckState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; checker?: Checker };

export const checkStateAtom = atom<CheckState>({ status: "idle" });
