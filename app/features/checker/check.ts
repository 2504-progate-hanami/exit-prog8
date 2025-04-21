interface Checker {
  description: string;
  check: (code: string) => boolean;
}

interface CheckResult {
  checker: Checker;
  result: boolean;
}

export const check = (
  code: string,
  staticCheckers: Array<Checker>,
  dynamicCheckers: Array<Checker>,
): Array<CheckResult> => {
  // TODO: implement
  console.log(code, staticCheckers, dynamicCheckers);

  return [
    {
      checker: {
        description: "サンプルのテスト",
        check: (code: string) => code.length > 0,
      },
      result: true,
    },
  ];
};
