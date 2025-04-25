import React from "react";
import { useParams } from "react-router-dom";

const Problems: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Problem Page</h1>
      <p>Problem ID: {id}</p>
    </div>
  );
};

export default Problems;
