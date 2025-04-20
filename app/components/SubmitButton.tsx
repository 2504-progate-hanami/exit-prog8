import type { JSX } from "react";
export function SubmitButton({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  return (
    <div className="relative group inline-block">
      <button
        type="button"
        className="bg-teal-500 px-12 py-2 hover:bg-teal-600 text-white rounded"
        onClick={onClick}
      >
        <div className="flex items-center justify-center">
          <p>{"できた!"}</p>
        </div>
      </button>

      <div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-auto
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-3 whitespace-nowrap">
          ⌘ + Enter
        </div>
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0
                      border-x-4 border-x-transparent
                      border-t-4 border-t-gray-800"
        ></div>
      </div>
    </div>
  );
}
