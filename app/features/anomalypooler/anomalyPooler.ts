// filepath: /home/yotu/github/exit-prog8/app/features/anomalypooler/anomalyPooler.ts
import type { Anomaly } from "~/types/anomaly";
import rainbowHeader from "~/resources/anomalies/rainbow-header";

// 全ての異変をここに登録（新しい異変を追加したらここにもインポートして追加する）
export const anomalies: Anomaly[] = [
  rainbowHeader,
  // 将来的にここに他の異変を追加していく
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
 * 指定した確率で異変を発生させるかどうかを決定する
 * @param probability 発生確率（0.0〜1.0）
 * @returns 発生させる場合はtrue、そうでない場合はfalse
 */
export function shouldTriggerAnomaly(probability: number = 0.6): boolean {
  return Math.random() < probability;
}
