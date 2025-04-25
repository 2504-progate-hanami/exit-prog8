import React from "react";
import { useParams } from "react-router-dom";

const ProblemIntro: React.FC = () => {
  const { id, index } = useParams<{ id: string; index: string }>();

  return (
    <div>
      <h1>Problem Intro</h1>
      <p>Problem ID: {id}</p>
      <p>Slide Index: {index}</p>
      <a href="/congrats">Go to Congrats</a>
    </div>
  );
};

export default ProblemIntro;
