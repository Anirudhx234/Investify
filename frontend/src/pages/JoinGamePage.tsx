import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useJoinGameMutation } from "../api/game";

export function JoinGamePage() {
    const { gameId } = useParams<{ gameId: string }>();
    console.log(gameId);
    const [joinGame, { isLoading }] = useJoinGameMutation();
    const [status, setStatus] = useState<"idle" | "success" | "failure" | "already-joined" | "game-does-not-exist">("idle");

    useEffect(() => {
        if (gameId) {
            joinGame({ gameId })
                .unwrap()
                .then(() => setStatus("success"))
                .catch((error) => {
                    if (error?.status === 403) {
                        setStatus("already-joined");
                    } else if (error?.status === 400) {
                        setStatus("game-does-not-exist");
                    } else {
                        setStatus("failure");
                    }
                });
        }
    }, [gameId, joinGame]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {isLoading ? (
                <div>Joining game...</div>
            ) : status === "success" ? (
                <div className="text-green-600 font-bold">JOINED</div>
            ) : status === "already-joined" ? (
                <div className="text-yellow-600 font-bold">ALREADY JOINED</div>
            ) : status === "game-does-not-exist" ? (
                <div className="text-red-600 font-bold">GAME DOES NOT EXIST</div>
            ) : status === "failure" ? (
                <div className="text-red-600 font-bold">FAILURE TO JOIN GAME</div>
            ) : (
                <div className="text-gray-600">Initializing...</div>
            )}
        </div>
    );
}
