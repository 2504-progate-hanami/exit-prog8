import React from "react";
import { useParams } from "react-router-dom";

const ProblemIntro: React.FC = () => {
  const { id, index } = useParams<{ id: string; index: string }>();

  return (
    <div>
      <h1>Problem Intro</h1>
      <p>Problem ID: {id}</p>
      <p>Slide Index: {index}</p>
    </div>
  );
};

export default ProblemIntro;
