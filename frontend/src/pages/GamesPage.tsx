import { Link, Redirect, Route, Switch } from "wouter";
import { CreateGameForm } from "../forms/CreateGameForm";
import { twMerge } from "../util/twMerge";
import { GamesTable, JoinableGamesTable } from "../components/GamesTable";
import { useAvailableGamesQuery, useGamePortfoliosQuery } from "../api/game";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function GamesPage() {
  return (
    <Switch>
      <Route path="/create" component={CreateGameForm} />
      <Route path="/joined" component={JoinedGames} nest />
      <Route path="/browse" component={BrowseGames} nest />
      <Route path="/:id" component={() => <>Game Page</>} />
      <Route path="*" component={() => <Redirect to="/create" replace />} />
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
          <GamesTable
            games={data.pastGames.map((gamePortfolio) => gamePortfolio.game)}
          />
        </Route>

        <Route path="/active">
          <GamesTable
            games={data.activeGames.map((gamePortfolio) => gamePortfolio.game)}
          />
        </Route>

        <Route path="/upcoming">
          <GamesTable
            games={data.upcomingGames.map(
              (gamePortfolio) => gamePortfolio.game,
            )}
          />
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
