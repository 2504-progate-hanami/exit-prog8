import type { Anomaly } from "~/types/anomaly";
import rainbowHeader from "~/resources/anomalies/rainbow-header";
import snowstormEffect from "~/resources/anomalies/snowstorm-effect";
import lightningEffect from "~/resources/anomalies/lightning-effect";
import levelUpIndent from "~/resources/anomalies/levelUpIndent";
import gamingWanko from "~/resources/anomalies/gaming-wanko";

// 異変を作成したら、ここに追加してください
export const anomalies: Anomaly[] = [
  rainbowHeader,
  snowstormEffect,
  lightningEffect,
  levelUpIndent,
  gamingWanko, // 新しい異変を追加
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
 * 異変を発生させる。
 * 確率を指定することで、異変が発生する確率を調整できる。
 * @param probability 発生確率（0.0〜1.0）
 * @returns 発生させる場合はtrue、そうでない場合はfalse
 */
export function triggerAnomaly(probability: number = 0.6): boolean {
  return Math.random() < probability;
}
