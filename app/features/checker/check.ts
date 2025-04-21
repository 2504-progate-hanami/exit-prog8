interface Checker {
  description: string;
  check: (code: string) => boolean;
}

interface CheckResult {
  status: "success" | "failed";
  failedChecker?: Checker;
}

export const check = (
  code: string,
  staticCheckers: Array<Checker>,
  dynamicCheckers: Array<Checker>,
): CheckResult => {
  // TODO: implement
  console.log(code, staticCheckers, dynamicCheckers);

  return { status: "success" };
};
