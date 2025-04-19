//import type { Route } from "./+types/home";

import { ConsoleUI } from "~/components/ConsoleUI";
import { SubmitButton } from "~/components/SubmitButton";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h2>Welcome to Remix</h2>
      <p>This is a simple example of a Remix app using React Router.</p>
      <ConsoleUI mode="console" problemId={1} />
      <ConsoleUI mode="sample" problemId={2} />
      <SubmitButton onClick={() => alert("Button clicked!")} />
    </div>
  );
}
