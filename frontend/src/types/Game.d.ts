export interface Game {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  buyingPower: number;
  mode: string;
}

export interface CreateGameArgs {
  name: string;
  startTime: string;
  endTime: string;
  buyingPower: number;
  mode: string;
}

export interface GamePortfolioResponse {
  pastGames: GamePortfolio[];
  activeGames: GamePortfolio[];
  upcomingGames: GamePortfolio[];
}

export interface GamePortfolio {
  id: string; // Portfolio ID
  name: string; // Portfolio Name
  game: GameDetails; // Associated Game Details
}

export interface GameDetails {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  buyingPower: number;
  mode: string | null; // Mode could be null
}