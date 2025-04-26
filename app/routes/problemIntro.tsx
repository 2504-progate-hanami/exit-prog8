import React from "react";
import { useParams } from "react-router-dom";
import { Slide } from "~/components/slide";

const ProblemIntro: React.FC = () => {
  const { id, index } = useParams<{ id: string; index: string }>();
  console.log(id);

  return <Slide id={Number(index)} />;
};

export default ProblemIntro;
