import { Link, useLocation } from "wouter";
import { gameTypes } from "../types";
import { formatNumber } from "../util/formatNumber";
import { useJoinGameMutation } from "../api/game";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function GamesTable({ games }: { games: gameTypes.Game[] }) {
  return (
    <div className="w-full max-w-[100vw] overflow-auto px-2">
      <table className="table-zebra w-full">
        <thead>
          <tr>
            <th className="w-1/4 py-2">Name</th>
            <th className="w-1/4 py-2">Buying Power</th>
            <th className="w-1/4 py-2">Start Time</th>
            <th className="w-1/4 py-2">End Time</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="hover">
              <td className="py-2 text-center">
                <Link href={`~/games/${game.id}`} className="link">
                  {game.name}
                </Link>
              </td>
              <td className="py-2 text-center">
                {formatNumber(game.buyingPower)}
              </td>
              <td className="py-2 text-center">
                {game.startTime.replace("T", " ")}
              </td>
              <td className="py-2 text-center">
                {game.endTime.replace("T", " ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {games.length === 0 && (
        <p className="mt-4 text-center italic">No games</p>
      )}
    </div>
  );
}

export function JoinableGamesTable({ games }: { games: gameTypes.Game[] }) {
  const [, navigate] = useLocation();
  const [joinGame, joinGameState] = useJoinGameMutation();
  const { isLoading } = useToastForRequest("Join Game", joinGameState, {
    backupErrorMessage: "Game joined!",
    onSuccess: () => {
      if (joinGameState.data)
        navigate(
          `~/games/${joinGameState.data.game.id}/portfolios/${joinGameState.data.id}`,
        );
    },
  });

  return (
    <div className="w-full max-w-[100vw] overflow-auto px-2">
      <table className="table-zebra w-full">
        <thead>
          <tr>
            <th className="w-1/5 px-1 py-2">Name</th>
            <th className="w-1/5 py-2">Buying Power</th>
            <th className="w-1/5 py-2">Start Time</th>
            <th className="w-1/5 py-2">End Time</th>
            <th className="w-1/5 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="hover">
              <td className="px-1 py-2 text-center">
                <Link href={`~/games/${game.id}`} className="link">
                  {game.name}
                </Link>
              </td>

              <td className="px-1 py-2 text-center">
                {formatNumber(game.buyingPower)}
              </td>

              <td className="px-1 py-2 text-center">
                {game.startTime.replace("T", " ")}
              </td>

              <td className="px-1 py-2 text-center">
                {game.endTime.replace("T", " ")}
              </td>

              <td className="px-1 py-2 text-center">
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={isLoading}
                  onClick={() => {
                    joinGame({ gameId: game.id })
                      .unwrap()
                      .catch(() => {});
                  }}
                >
                  {isLoading && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Join
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {games.length === 0 && (
        <p className="mt-4 text-center italic">No games</p>
      )}
    </div>
  );
}
