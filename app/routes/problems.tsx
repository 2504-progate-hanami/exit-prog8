import React from "react";
import { useParams } from "react-router-dom";

const Problems: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Problem Page</h1>
      <p>Problem ID: {id}</p>
      <a href="/problems/1/intro/1">Go to Problem 1 Slide 1</a>
    </div>
  );
};

export default Problems;
