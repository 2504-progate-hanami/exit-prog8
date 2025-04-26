import React from "react";
import { useParams } from "react-router-dom";
import { Slide } from "~/components/slide";

const ProblemIntro: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, index } = useParams<{ id: string; index: string }>();

  return <Slide id={Number(index)} />;
};

export default ProblemIntro;
