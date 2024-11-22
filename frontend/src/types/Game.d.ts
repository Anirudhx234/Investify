import type { BasicClient } from "./Client";

export interface Game {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  buyingPower: number;
  type: "PUBLIC" | "PRIVATE";
}

export interface GamePortfolio {
  id: string;
  name: string;
  game: Game;
}

export interface Player {
  rank: number
  client: BasicClient;
  totalValue: number;
}
