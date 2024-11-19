import { FaTrophy } from "react-icons/fa";
import {Link, useParams} from "wouter";
import {twMerge} from "../util/twMerge.ts";
import {useLeaderboardDataQuery} from "../api/game.ts";

export function Leaderboard() {
    //const params = useParams() as { competitionId : string };

    //const players = useLeaderboardDataQuery({ competitionId: params.competitionId });

    const players = [
        { id: "1", username: "AliceAlice", totalAssetValue: 120000 },
        { id: "2", username: "Bob", totalAssetValue: 95000 },
        { id: "3", username: "Charlie", totalAssetValue: 85000 },
        { id: "4", username: "David", totalAssetValue: 80000 },
        { id: "5", username: "Eve", totalAssetValue: 75000 },
        { id: "1", username: "Alice", totalAssetValue: 70000 },
        { id: "2", username: "Bob", totalAssetValue: 68000 },
        { id: "3", username: "Charlie", totalAssetValue: 65000 },
        { id: "4", username: "David", totalAssetValue: 63000 },
        { id: "5", username: "Eve", totalAssetValue: 60000 },
        { id: "1", username: "Alice", totalAssetValue: 59000 },
        { id: "2", username: "Bob", totalAssetValue: 58000 },
        { id: "3", username: "Charlie", totalAssetValue: 30000 },
        { id: "4", username: "David", totalAssetValue: 21000 },
        { id: "5", username: "Eve", totalAssetValue: 13000 },
    ];

    return (
        <div
            className={twMerge(
                players && "flex aspect-[4/5] flex-col gap-4 rounded-md bg-base-200 p-2 shadow-sm ~w-80/96",
                !players && "skeleton aspect-[4/5] ~w-80/96",
            )}
        >
            <div className="card h-full w-full shadow-lg bg-base-100 overflow-y-auto">
                <div className="card-body">
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
                                {players.map((player, index) => (
                                    <tr key={player.id}>
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
                                                href={`~/clients/${player.id}`}
                                                className="text-primary hover:underline"
                                            >
                                                {player.username}
                                            </Link>
                                        </td>

                                        <td className="text-right">
                                            ${player.totalAssetValue.toLocaleString()}
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
