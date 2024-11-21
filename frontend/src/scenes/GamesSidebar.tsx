import { Route, Switch, useParams } from "wouter";
import { LinksList } from "../components/LinksList";
import { useGetGamePortfolioQuery } from "../api/game";

const items = ["/create", "/joined", "/browse"];
export function GamesSidebar() {
  return (
    <>
      <LinksList links={items} />

      <Switch>
        <Route path="/create" component={() => <></>} nest />
        <Route path="/browse" component={() => <></>} nest />
        <Route path="/joined" component={() => <></>} nest />
        <Route path="/:gameId" component={GameLinks} nest />
      </Switch>
    </>
  );
}

export function GameLinks() {
  const params = useParams() as { gameId: string };
  const { gameId } = params;
  const { data } = useGetGamePortfolioQuery({ gameId });

  return (
    <>
      <div className="divider"></div>
      <p className="text-lg font-semibold">{data?.game.name}</p>
      <LinksList
        links={[
          "/leaderboard",
          { url: `~/games/${gameId}/portfolios/me`, label: "Portfolio" },
        ]}
      />
    </>
  );
}
