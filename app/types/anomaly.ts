/**
 * 異変の設定を定義するインターフェース
 */
export interface Anomaly {
  // 一意な識別子
  id: string;

  // 異変を指す端的な説明
  name: string;

  // 異変の説明
  description: string;

  // 実行関数
  execute: () => void;
}
