import { FaTrophy } from "react-icons/fa";
import { Link, useParams } from "wouter";
import { useLeaderboardDataQuery } from "../api/game.ts";
import { useToastForRequest } from "../hooks/useToastForRequests.tsx";
import { formatNumber } from "../util/formatNumber.ts";
import {Player} from "../types/Game";

function topNValues(players: Player[], n: number) {
  const uniqueValues = Array.from(
      new Set(players.map(player => player.totalValue))
  );
  const sortedUniqueValues = uniqueValues.sort((a, b) => b - a);

  return sortedUniqueValues.slice(0, n);
}

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

  const topThree = topNValues(players, 3)

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
          {players.map((player, index) => (
            <tr key={player.client.id} className="hover">
              <td className="py-2">
                <div className="flex items-center justify-center space-x-2">
                  {player.totalValue === topThree[0] ? (
                    <FaTrophy className="text-yellow-500" title="1st Place" />
                  ) : player.totalValue === topThree[1] ? (
                    <FaTrophy className="text-gray-400" title="2nd Place" />
                  ) : player.totalValue === topThree[2] ? (
                    <FaTrophy className="text-amber-600" title="3rd Place" />
                  ) : (
                    <FaTrophy className="opacity-0" title="unranked" />
                  )}
                  <span>{topThree.indexOf(player.totalValue) !== -1 ? topThree.indexOf(player.totalValue) + 1 : (index + 1)}</span>
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
