export type CheckCodeResponse = {
  guessed: boolean;
  hint: Hint;
  saveGame: boolean;
};

export type Hint = {
  readonly correctPlace: number;
  readonly wrongPlace: number;
  readonly notOccur: number;
};
