import { FaTrophy } from "react-icons/fa";
import {Link, useParams} from "wouter";
import {twMerge} from "../util/twMerge.ts";
import {useLeaderboardDataQuery} from "../api/game.ts";

export function Leaderboard() {
    const params = useParams() as { gameId : string };

    const players = useLeaderboardDataQuery({ gameId: params.gameId });

    return (
        <div
            className={twMerge(
                players && "flex aspect-[4/5] flex-col gap-4 rounded-md bg-base-200 p-2 shadow-sm ~w-80/96",
                !players && "skeleton aspect-[4/5] ~w-80/96",
            )}
        >
            <div className="card h-full w-full shadow-lg bg-base-100 overflow-y-auto">
                <div className="card-body items-center">
                    <h2 className="card-title text-center">Leaderboard</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead>
                            <tr>
                                <th className="text-center">Rank</th>
                                <th>Username</th>
                                <th className="text-right">Total Asset Value</th>
                            </tr>
                            </thead>
                            {players &&
                                <tbody>
                                {players.data && players.data.map((player, index) => (
                                    <tr key={player.client.id}>
                                        <td className="text-center">
                                            <div className={"flex space-x-2"}>
                                                {index === 0 ? (
                                                    <FaTrophy className="text-yellow-500" title="1st Place"/>
                                                ) : index === 1 ? (
                                                    <FaTrophy className="text-gray-400" title="2nd Place"/>
                                                ) : index === 2 ? (
                                                    <FaTrophy className="text-amber-600" title="3rd Place"/>
                                                ) : (
                                                    <FaTrophy className="opacity-0" title="unranked"/>
                                                )}
                                                <span>{index + 1}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <Link
                                                href={`~/clients/${player.client.id}`}
                                                className="text-primary hover:underline"
                                            >
                                                {player.client.username}
                                            </Link>
                                        </td>

                                        <td className="text-right">
                                            ${player.totalValue.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}