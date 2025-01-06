import { Code } from "./GameInfo";

export type CheckCodeRequest = {
  userCode: Code;
  lastScore: number;
};
