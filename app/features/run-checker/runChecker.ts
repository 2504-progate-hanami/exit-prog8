/**
 * チェッカーランナースクリプト - コードのチェックを実行する
 *
 * 使用方法:
 * ts-node runChecker.ts '<コード>' '<staticCheckersJSON>' '<dynamicCheckersJSON>'
 *
 * 引数:
 * 1. コード: チェックするJavaScript/TypeScriptコード
 * 2. staticCheckers: 静的チェッカーの配列をJSON形式で
 * 3. dynamicCheckers: 動的チェッカーの配列をJSON形式で
 */

import { check } from "../checker/check";
import type { StaticChecker, DynamicChecker } from "~/types/checker";

// 引数の受け取り
const args = process.argv.slice(2);
if (args.length < 3) {
  console.error(
    "引数が不足しています。コード、静的チェッカー、動的チェッカーを指定してください。",
  );
  process.exit(1);
}

const codeToCheck = args[0];
let staticCheckers: StaticChecker[] = [];
let dynamicCheckers: DynamicChecker[] = [];

try {
  staticCheckers = JSON.parse(args[1]);
  dynamicCheckers = JSON.parse(args[2]);
} catch (error) {
  console.error("チェッカーのJSONパースに失敗しました:", error);
  process.exit(1);
}

// チェック実行
const result = check(codeToCheck, staticCheckers, dynamicCheckers);

// 結果を出力
console.log(JSON.stringify(result, null, 2));

// わかりやすい結果も出力
if (result.status === "success") {
  console.log("🦈 おめでとう！全てのチェックに合格したよ！");
} else if (result.failedChecker) {
  console.log("🦈 残念！チェックに失敗したよ...");
  console.log(
    "理由: " +
      (result.failedChecker.message || result.failedChecker.description),
  );
}
