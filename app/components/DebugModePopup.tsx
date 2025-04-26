// filepath: /home/yotu/github/exit-prog8/app/components/DebugModePopup.tsx
import { useAtom } from "jotai";
import React from "react";
import {
  activeAnomalyAtom,
  anomalyPoolAtom,
  debugAnomaliesAtom,
  isDebugModeAtom,
} from "~/atoms";
import type { Anomaly } from "~/types/anomaly";

export const DebugModePopup: React.FC = () => {
  const [isDebugMode, setIsDebugMode] = useAtom(isDebugModeAtom);
  const [, setActiveAnomaly] = useAtom(activeAnomalyAtom);
  const [anomalyPool] = useAtom(anomalyPoolAtom);
  const [debugAnomalies, setDebugAnomalies] = useAtom(debugAnomaliesAtom);

  // デバッグモードを終了
  const handleClose = () => {
    setIsDebugMode(false);
  };

  // 特定の異変を実行
  const triggerAnomaly = (anomaly: Anomaly) => {
    anomaly.execute();
    setActiveAnomaly(anomaly);

    // デバッグ履歴に追加
    setDebugAnomalies([...debugAnomalies, anomaly]);
  };

  if (!isDebugMode) return null;

  return (
    <div className="fixed left-4 bottom-4 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-blue-500 w-80">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold flex items-center">
          <span className="mr-2">🦈</span>デバッグモード
        </h3>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-2">利用可能な異変：</p>
        <div className="max-h-40 overflow-y-auto">
          {anomalyPool.map((anomaly) => (
            <div
              key={anomaly.id}
              className="mb-2 p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
              onClick={() => triggerAnomaly(anomaly)}
            >
              <div className="font-medium">{anomaly.name}</div>
              <div className="text-xs text-gray-300">{anomaly.description}</div>
            </div>
          ))}
        </div>
      </div>

      {debugAnomalies.length > 0 && (
        <div>
          <p className="text-sm mb-2">実行履歴：</p>
          <div className="max-h-32 overflow-y-auto">
            {debugAnomalies.map((anomaly, index) => (
              <div
                key={`${anomaly.id}-${index}`}
                className="text-xs py-1 pl-2 border-l-2 border-blue-400"
              >
                {anomaly.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-400">
        <p>Ctrl+Shift+D でデバッグモードの切り替えができるよ！</p>
      </div>
    </div>
  );
};
