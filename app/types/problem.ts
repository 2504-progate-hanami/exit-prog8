import type { DynamicChecker, StaticChecker } from "./checker";

export interface Problem {
  name: string;
  instructions: Array<ProblemInstruction>;
  procedure: HTMLElement;
  initialCode: string;
  answerCode: string;
  checkers: {
    static: Array<StaticChecker>;
    dynamic: Array<DynamicChecker>;
  };
  nextProblemId?: string;
}

export interface ProblemInstruction {
  title: string;
  description: string;
  imgSrc?: string;
}
