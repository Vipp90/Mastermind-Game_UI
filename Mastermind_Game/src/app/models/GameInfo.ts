export type GameInfo = {
  playerName: string;
  code: Code;
  gameMode: GameMode;
};

export enum GameMode {
  ManualSet,
  RandomSet,
}

type Code = {
  firstColor: Colors;
  secondColor: Colors;
  thirdColor: Colors;
  fourthColor: Colors;
};

export enum Colors {
  White = -1,
  Blue = 0,
  Red = 1,
  Green = 2,
  Yellow = 3,
  Brown = 4,
  Orange = 5,
}
