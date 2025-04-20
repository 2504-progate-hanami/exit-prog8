type card = {
  where: string;
  problemProps: string;
  problem: string;
};

export function Card({ where, problemProps, problem }: card) {
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
        <div className="relative">
          <input
            type="text"
            className="w-24 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm text-black"
            value={problemProps}
            readOnly
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <span className="ml-2 text-gray-700 text-sm">{problem}</span>
      </div>

      <button className="bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center justify-center w-full">
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
