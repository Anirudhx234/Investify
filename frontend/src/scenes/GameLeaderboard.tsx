import { FaTrophy } from "react-icons/fa";
import { Link, useParams } from "wouter";
import { useLeaderboardDataQuery } from "../api/game.ts";
import { useToastForRequest } from "../hooks/useToastForRequests.tsx";
import { formatNumber } from "../util/formatNumber.ts";

export function GameLeaderboard() {
  const params = useParams() as { gameId: string };
  const { gameId } = params;

  const playersState = useLeaderboardDataQuery({ gameId });
  const { isSuccess, component } = useToastForRequest(
    "Game Leaderboard",
    playersState,
    {
      backupSuccessMessage: "Retrieved game leaderboard!",
    },
  );

  const players = playersState.data;

  if (!isSuccess || !players) return component;

  return (
    <div className="w-full max-w-[100vw] overflow-auto px-2">
      <table className="table-zebra w-full">
        <thead>
          <tr>
            <th className="w-1/3 py-2">Rank</th>
            <th className="w-1/3 py-2">Username</th>
            <th className="w-1/3 py-2">Total Value</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.client.id} className="hover">
              <td className="py-2">
                <div className="flex items-center justify-center space-x-2">
                  {player.rank == 1? (
                    <FaTrophy className="text-yellow-500" title="1st Place" />
                  ) : player.rank == 2 ? (
                    <FaTrophy className="text-gray-400" title="2nd Place" />
                  ) : player.rank == 3 ? (
                    <FaTrophy className="text-amber-600" title="3rd Place" />
                  ) : (
                    <FaTrophy className="opacity-0" title="unranked" />
                  )}
                  <span>{player.rank}</span>
                </div>
              </td>

              <td className="py-2 text-center">
                <Link
                  href={`~/clients/${player.client.id}`}
                  className="text-primary hover:underline"
                >
                  {player.client.username}
                </Link>
              </td>

              <td className="py-2 text-center">
                ${formatNumber(player.totalValue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
