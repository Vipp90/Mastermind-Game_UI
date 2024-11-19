export type CheckCodeResponse = {
  guessed: boolean;
  hint: Hint;
};

type Hint = {
  correctPlace: number;
  wrongPlace: number;
  notOccur: Number;
};
