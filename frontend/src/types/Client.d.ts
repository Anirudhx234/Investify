/*
 * client data: this interface only represents
 * info that is expected to be available on the frontend
 */

import { Game } from "./Game";

export interface BasicClient {
  id: string;
  username: string;
  profilePicture?: string | null | undefined;
}

export type Badge =
  | { id: string; type: "participation"; game: Game }
  | { id: string; type: "rank"; rank: number; game: Game };

export interface Client extends BasicClient {
  badges: Badge[];
}

export interface LoggedInClient extends Client {
  email: string;
  age?: number | undefined | null;
  income?: number | undefined | null;
  shortTermGoal?: string | undefined | null;
  longTermGoal?: string | undefined | null;
  investmentRisk?: "LOW" | "MEDIUM" | "HIGH";
  userSavings?: number | undefined | null;
  currentSavings?: number | undefined | null;
  friends: BasicClient[];
  friendRequests: BasicClient[];
  financialAdvice?: string | undefined | null;
}
