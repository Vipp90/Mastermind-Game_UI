import { Code } from "./GameInfo";

export type CheckCodeRequest = {
  userCode: Code;
  chances: number;
};
