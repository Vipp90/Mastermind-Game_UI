import { Code } from "./GameInfo";

export type CheckCodeResponse = {
  guessed: boolean;
  hint: Hint;
  saveGame: boolean;
  hiddenCode: Code;
};

export type Hint = {
  readonly correctPlace: number;
  readonly wrongPlace: number;
  readonly notOccur: number;
};
