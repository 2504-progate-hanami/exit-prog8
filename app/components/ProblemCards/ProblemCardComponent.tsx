import { useAtom } from "jotai";
import { isSlideModalAtom } from "~/atoms";

type card = {
  where: string;
  problemProps: string;
  problem: HTMLElement;
};

export function Card({ where, problemProps, problem }: card) {
  const [isModalOpen, setIsModalOpen] = useAtom(isSlideModalAtom);
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-md">
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7m-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-4 0h4M14 9v5m-4 9h8m-8-5h8M6 9v5"
          />
        </svg>
        <span className="text-gray-700 font-semibold">{where}</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="ml-2 text-gray-700 text-sm">{problemProps}</span>
      </div>
      <div className="flex items-center mb-4">
        <span
          className="ml-2 text-gray-700 text-sm"
          dangerouslySetInnerHTML={{ __html: problem.innerHTML }}
        ></span>
      </div>

      <button
        className="bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center justify-center w-full"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm6 6H7v4h6v-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm">スライドで確認</span>
      </button>
    </div>
  );
}
