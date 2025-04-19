import { useState } from "react";
import type { JSX } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";

type ConsoleUIProps = {
  mode: "console" | "sample";
  problemId: number;
};

type ProblemAnswerResponse = {
  answer: string[];
};

type ProblemSubmitResponse = {
  answer: string[];
  isCorrect: boolean;
};

async function fetchProblemAnswer(id: number): Promise<ProblemAnswerResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // return await axios.get<ProblemAnswerResponse>(`/api/problems/${id}`)
  const dummyData: ProblemAnswerResponse = {
    answer: [
      `Sample Line 1 : ${id}`,
      `Sample Line 2 : ${new Date().toLocaleTimeString()}`,
    ],
  };
  return dummyData;
}

async function postProblem(
  id: number,
  code: string,
): Promise<ProblemSubmitResponse> {
  console.log(id, code);
  await new Promise((resolve) => setTimeout(resolve, 800));
  // return await axios.post<ProblemSubmitResponse>(
  //   `/api/problems/${id}`,
  //   { code }
  // );

  const isCorrect = Math.random() > 0.5;
  const dummyData: ProblemSubmitResponse = {
    answer: [
      `Result line 1`,
      `Result line 2: ${new Date().toLocaleTimeString()}`,
    ],
    isCorrect: isCorrect,
  };
  return dummyData;
}

export function ConsoleUI({ mode, problemId }: ConsoleUIProps): JSX.Element {
  const [data, setData] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const query = useQuery<ProblemAnswerResponse, Error>({
    queryKey: ["problem", problemId],
    queryFn: () => fetchProblemAnswer(problemId),
    enabled: false,
  });

  const submitMutation = useMutation<ProblemSubmitResponse, Error, string>({
    mutationFn: (code: string) => postProblem(problemId, code),
    onMutate: () => {
      setData([]);
      setIsCorrect(undefined);
    },
    onSuccess: (submitData) => {
      setData(submitData.answer);
      setIsCorrect(submitData.isCorrect);
    },
    onError: (error) => {
      console.error("Submission failed:", error);
      setData(["エラーが発生しました: " + error.message]);
      setIsCorrect(undefined);
    },
    onSettled: () => {},
  });

  const handleRun = async () => {
    if (mode === "console") {
      const userCode = "ユーザーのコード";
      submitMutation.mutate(userCode);
    } else {
      setData([]);
      setIsCorrect(undefined);
      const result = await query.refetch();
      if (result.isSuccess && result.data) {
        setData(result.data.answer);
      } else if (result.isError) {
        console.error("Sample fetch failed (query error):", result.error);
        setData(["データの取得に失敗しました: " + result.error.message]);
      }
    }
  };

  const isLoading = submitMutation.isPending || query.isFetching;

  const buttonText = submitMutation.isPending
    ? "実行中..."
    : query.isFetching
      ? "取得中..."
      : "▶";

  const consoleOutput = submitMutation.isPending
    ? "コードを送信中..."
    : query.isFetching
      ? "見本データを取得中..."
      : data.join("\n");

  return (
    <div className="rounded-md overflow-hidden shadow-lg border border-gray-200 bg-white max-w-md">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="font-mono text-sm text-gray-700">
          {">_ " + (mode === "console" ? "コンソール" : "見本")}
        </span>
        <button
          type="button"
          onClick={handleRun}
          disabled={isLoading}
          className={`text-gray-600 cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {buttonText}
        </button>
      </div>

      <div className="p-4 bg-[#0f172a] h-64 overflow-y-auto">
        <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
          {consoleOutput}
        </pre>
        {!submitMutation.isPending &&
          mode === "console" &&
          isCorrect !== undefined && (
            <div
              className={`mt-2 text-sm ${isCorrect ? "text-green-400" : "text-red-400"}`}
            >
              {isCorrect ? "Correct! 🎉" : "Incorrect 😢"}
            </div>
          )}
        {mode === "console" && submitMutation.isError && (
          <div className="mt-2 text-sm text-red-400">
            エラー: {submitMutation.error.message}
          </div>
        )}
        {mode === "sample" && query.isError && !query.isFetching && (
          <div className="mt-2 text-sm text-red-400">
            エラー: {query.error.message}
          </div>
        )}
      </div>
    </div>
  );
}
