export interface Game {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  buyingPower: number;
}

export interface GamePortfolio {
  id: string;
  name: string;
  game: Game;
}
