export interface Problem {
  name: string;
  instructions: Array<ProblemInstruction>;
  procedure: HTMLElement;
  initialCode: string;
  answerCode: string;
}

export interface ProblemInstruction {
  title: string;
  description: string;
  imgSrc?: string;
}
