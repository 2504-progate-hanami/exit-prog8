import type { Anomaly } from "~/types/anomaly";
import rainbowHeader from "~/resources/anomalies/rainbow-header";
import snowstormEffect from "~/resources/anomalies/snowstorm-effect";
import lightningEffect from "~/resources/anomalies/lightning-effect";
// import levelUpIndent from "~/resources/anomalies/levelUpIndent";
import gamingWanko from "~/resources/anomalies/gaming-wanko";
import shakingScreen from "~/resources/anomalies/shaking-screen"; // 新しい異変をインポート
import levelUpFontSize from "~/resources/anomalies/levelUpFontSize";

// 異変を作成したら、ここに追加してください
export const anomalies: Anomaly[] = [
  rainbowHeader,
  snowstormEffect,
  lightningEffect,
  levelUpFontSize,
  gamingWanko,
  gamingWanko,
  shakingScreen,
];

/**
 * 異変プールから指定された数の異変をランダムに選択する
 * @param count 選択する異変の数（デフォルト: 1）
 * @returns 選択された異変の配列
 */
export function getRandomAnomalies(count: number = 1): Anomaly[] {
  if (count <= 0) return [];
  if (count >= anomalies.length) return [...anomalies];

  // 異変をシャッフルしてcount個取得
  const shuffled = [...anomalies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * 異変を発生させるかどうかを抽選する。
 * 確率を指定することで、異変が発生する確率を調整できる。
 * @param probability 発生確率（0.0〜1.0）
 * @returns 発生させる場合はtrue、そうでない場合はfalse
 */
export function lotteryTriggerAnomaly(probability: number = 0.6): boolean {
  if (probability < 0 || probability > 1) {
    throw new Error("確率は0.0〜1.0の範囲で指定してください");
  }

  return Math.random() < probability;
}
