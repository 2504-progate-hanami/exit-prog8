import { useAtomValue } from "jotai";
import { problemAtom } from "~/atoms";
import { Card } from "~/components/ProblemCards/ProblemCardComponent";

export function ProcedureComponent() {
  const problem = useAtomValue(problemAtom);
  if (!problem) return <div>問題が見つかりません</div>;
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 h-full">
      <Card where={problem.name} problemProps="" problem={problem.procedure} />
    </div>
  );
}
