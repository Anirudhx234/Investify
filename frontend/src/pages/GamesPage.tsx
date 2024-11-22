import { Link, Redirect, Route, Switch, useLocation, useParams } from "wouter";
import { CreateGameForm } from "../forms/CreateGameForm";
import { twMerge } from "../util/twMerge";
import { JoinedGamesTable, JoinableGamesTable } from "../components/GamesTable";
import {
  useAvailableGamesQuery,
  useGamePortfoliosQuery,
  useGetGamePortfolioQuery,
  useJoinGameMutation,
} from "../api/game";
import { useToastForRequest } from "../hooks/useToastForRequests";
import { PaperPortfolioEditorPage } from "./PaperPortfolioEditorPage";
import { GameLeaderboard } from "../scenes/GameLeaderboard";
import { formatNumber } from "../util/formatNumber";
import { useEffect } from "react";
import { convertUTCToLocalTime } from "../util/convertTimezone";

export function GamesPage() {
  return (
    <Switch>
      <Route path="/create" component={CreateGameForm} />
      <Route path="/joined" component={JoinedGames} nest />
      <Route path="/browse" component={BrowseGames} nest />

      <Route path="/:gameId/join" component={JoinGame} />
      <Route path="/:gameId/leaderboard" component={GameLeaderboard} />
      <Route path="/:gameId/portfolios/me" component={GamePortfolio} nest />
      <Route path="*" component={() => <Redirect to="/browse" replace />} />
    </Switch>
  );
}

export function JoinedGames() {
  const gamePortfoliosState = useGamePortfoliosQuery();
  const { isSuccess, component } = useToastForRequest(
    "Joined Games",
    gamePortfoliosState,
    {
      backupSuccessMessage: "Retrieved joined games!",
    },
  );

  const { data } = gamePortfoliosState;

  if (!isSuccess || !data) return component;
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex ~gap-4/8">
        <Link
          href="/past"
          className={(active) => twMerge("btn", active && "btn-primary")}
        >
          Past
        </Link>
        <Link
          href="/active"
          className={(active) => twMerge("btn", active && "btn-primary")}
        >
          Active
        </Link>
        <Link
          href="/upcoming"
          className={(active) => twMerge("btn", active && "btn-primary")}
        >
          Upcoming
        </Link>
      </div>

      <Switch>
        <Route path="/past">
          <JoinedGamesTable gamePortfolios={data.pastGames} />
        </Route>

        <Route path="/active">
          <JoinedGamesTable gamePortfolios={data.activeGames} />
        </Route>

        <Route path="/upcoming">
          <JoinedGamesTable gamePortfolios={data.upcomingGames} />
        </Route>

        <Route path="*" component={() => <Redirect to="/active" replace />} />
      </Switch>
    </div>
  );
}

export function BrowseGames() {
  const availableGamesState = useAvailableGamesQuery();
  const { isSuccess, component } = useToastForRequest(
    "Available Games",
    availableGamesState,
    {
      backupSuccessMessage: "Retrieved available games!",
    },
  );

  const { data } = availableGamesState;

  if (!isSuccess || !data) return component;
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex ~gap-4/8">
        <Link
          href="/active"
          className={(active) => twMerge("btn", active && "btn-primary")}
        >
          Active
        </Link>
        <Link
          href="/upcoming"
          className={(active) => twMerge("btn", active && "btn-primary")}
        >
          Upcoming
        </Link>
      </div>

      <Switch>
        <Route path="/active">
          <JoinableGamesTable games={data.activeGames} />
        </Route>

        <Route path="/upcoming">
          <JoinableGamesTable games={data.upcomingGames} />
        </Route>

        <Route path="*" component={() => <Redirect to="/active" replace />} />
      </Switch>
    </div>
  );
}

export function JoinGame() {
  const params = useParams() as { gameId: string };
  const { gameId } = params;

  const [, navigate] = useLocation();
  const [joinGame, joinGameState] = useJoinGameMutation();
  const { isSuccess, component } = useToastForRequest(
    "Join Game",
    joinGameState,
    {
      backupSuccessMessage: "Game Joined!",
      onSuccess: () => {
        if (joinGameState.data)
          navigate(`/${joinGameState.data.game.id}/leaderboard`);
      },
    },
  );

  useEffect(() => {
    joinGame({ gameId })
      .unwrap()
      .catch(() => {});
  }, [joinGame, gameId]);

  if (!isSuccess) return component;
  return <p>Processing...</p>;
}

export function GamePortfolio() {
  const params = useParams() as { gameId: string };
  const { gameId } = params;

  const gamePortfolioState = useGetGamePortfolioQuery({ gameId });
  const { isSuccess, component } = useToastForRequest(
    "Game Portfolio",
    gamePortfolioState,
    { backupSuccessMessage: "Retrieved game portfolio!" },
  );

  const data = gamePortfolioState.data;
  const currTime = convertUTCToLocalTime(new Date().toISOString());

  if (!isSuccess || !data) return component;
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-3xl font-bold">
          {data.game.name} (${formatNumber(data.game.buyingPower)})
        </h1>

        <p>
          {data.game.startTime.replace("T", " ")} to{" "}
          {data.game.endTime.replace("T", " ")}
        </p>

        <p>{data.game.type}</p>

        <p>
          Join Link:{" "}
          <Link
            href={`~/games/${data.game.id}/join`}
            className="link link-primary"
          >
            localhost:5173/games/{data.game.id}/join
          </Link>
        </p>
      </div>

      <div className="divider"></div>

      <PaperPortfolioEditorPage
        id={data.id}
        disabled={data.game.endTime < currTime}
      />
    </div>
  );
}
