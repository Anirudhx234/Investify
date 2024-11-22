import type { Client } from "./Client";

export interface Game {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  buyingPower: number;
  mode: string;
}

export interface GamePortfolio {
  id: string;
  name: string;
  game: Game;
}

export interface GamePortfolioResponse {
  pastGames: GamePortfolio[];
  activeGames: GamePortfolio[];
  upcomingGames: GamePortfolio[];
}

export interface Player {
  client: Client;
  totalValue: number;
}
