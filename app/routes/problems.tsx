import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Problem } from "~/types/problem";

const Problems: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadProblem = async () => {
      try {
        const problemModule = await import(`../resources/problems/${id}.ts`);
        setProblem(problemModule.default);
      } catch (err) {
        console.error("Error loading problem:", err);
        setError("その問題IDは存在しません。");
      }
    };

    loadProblem();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!problem) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>{problem.name}</h1>
      <div>
        {problem.instructions.map((instruction, index) => (
          <div key={index}>
            <h2>{instruction.title}</h2>
            <p>{instruction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;
