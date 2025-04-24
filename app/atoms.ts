import { atom } from "jotai";
import type * as monaco from "monaco-editor";
import type { WebContainer } from "@webcontainer/api";

export const editorInstanceAtom =
  atom<monaco.editor.IStandaloneCodeEditor | null>(null);

export const editorContentAtom = atom<string>(
  '// "Hello, World!"とコンソールに出力するコードを書いてください\n',
);

export const webContainerAtom = atom<WebContainer | null>(null);
