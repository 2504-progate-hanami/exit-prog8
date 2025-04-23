export interface Problem {
  name: string;
  instructions: Array<ProblemInstruction>;
  procedure: HTMLElement;
  answerCode: string;
}

export interface ProblemInstruction {
  title: string;
  description: string;
  imgSrc: string;
}
