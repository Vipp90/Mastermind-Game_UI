export type CheckCodeResponse = {
  guessed: boolean;
  hint: Hint;
};

export type Hint = {
  readonly correctPlace: number;
  readonly wrongPlace: number;
  readonly notOccur: number;
};
