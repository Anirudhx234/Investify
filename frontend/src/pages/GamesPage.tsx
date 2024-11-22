import { useGetGamesQuery } from "../api/game";
import { useForm } from "react-hook-form";
import { useCreateGameMutation } from "../api/game";
import { FormInput } from "../components/FormInput";
import { FormNumberInput } from "../components/FormNumberInput";
import { FormSubmit } from "../components/FormSubmit";

export interface NewGameFormShape {
    clientId: string;
    name: string;
    startTime: string;
    endTime: string;
    buyingPower: number;
    mode: string; // Public vs Private
}

export function GamesPage() {
    //const clientId = "me"; // Replace with actual clientId logic if needed
    const { data: gamePortfolios, isLoading: isFetchingGames } = useGetGamesQuery();
    const form = useForm<NewGameFormShape>();
    const [createGame, { isLoading: isCreating }] = useCreateGameMutation();

    const onSubmit = form.handleSubmit(({ ...data }) => {
        createGame({ request: data })
            .unwrap()
            .then(() => form.reset())
            .catch(() => {
                console.log(data);
            }); // Handle error
    });

    return (
        <div className="mt-4 flex flex-col items-center gap-8">
            {/* Display Active Games */}
            <div className="flex w-full max-w-lg flex-col gap-4">
                <h2 className="text-lg font-bold">Your Active Games</h2>
                {isFetchingGames ? (
                    <p>Loading games...</p>
                ) : gamePortfolios?.activeGames?.length ? (
                    <ul className="list-disc pl-5">
                        {gamePortfolios.activeGames.map((portfolio) => (
                            <li key={portfolio.id}>
                                <strong>{portfolio.name}</strong>: {portfolio.game.name}
                                <br />
                                Starts: {new Date(portfolio.game.startTime).toLocaleString()}
                                <br />
                                Ends: {new Date(portfolio.game.endTime).toLocaleString()}
                                <br />
                                Buying Power: ${portfolio.game.buyingPower.toFixed(2)}
                                <br />
                                Mode: {portfolio.game.mode ?? "Not Specified"}
                                <br />
                                Join link: <a href={`http://localhost:5173/game/${portfolio.game.id}/join`}>localhost:5173/game/{portfolio.game.id}/join</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No active games found.</p>
                )}
                <h2 className="text-lg font-bold">Your Upcoming Games</h2>
                {isFetchingGames ? (
                    <p>Loading games...</p>
                ) : gamePortfolios?.upcomingGames?.length ? (
                    <ul className="list-disc pl-5">
                        {gamePortfolios.upcomingGames.map((portfolio) => (
                            <li key={portfolio.id}>
                                <strong>{portfolio.name}</strong>: {portfolio.game.name}
                                <br />
                                Starts: {new Date(portfolio.game.startTime).toLocaleString()}
                                <br />
                                Ends: {new Date(portfolio.game.endTime).toLocaleString()}
                                <br />
                                Buying Power: ${portfolio.game.buyingPower.toFixed(2)}
                                <br />
                                Mode: {portfolio.game.mode ?? "Not Specified"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming games found.</p>
                )}
                <h2 className="text-lg font-bold">Your Past Games</h2>
                {isFetchingGames ? (
                    <p>Loading games...</p>
                ) : gamePortfolios?.pastGames?.length ? (
                    <ul className="list-disc pl-5">
                        {gamePortfolios.pastGames.map((portfolio) => (
                            <li key={portfolio.id}>
                                <strong>{portfolio.name}</strong>: {portfolio.game.name}
                                <br />
                                Starts: {new Date(portfolio.game.startTime).toLocaleString()}
                                <br />
                                Ends: {new Date(portfolio.game.endTime).toLocaleString()}
                                <br />
                                Buying Power: ${portfolio.game.buyingPower.toFixed(2)}
                                <br />
                                Mode: {portfolio.game.mode ?? "Not Specified"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No past games found.</p>
                )}
            </div>

            {/* Form to Create a New Game */}
            <div className="flex w-full max-w-lg flex-col gap-4 ~text-sm/base">
                <form className="flex flex-col" onSubmit={onSubmit}>
                    <FormInput
                        name="name"
                        label="Game Name"
                        form={form}
                        required
                        inputAttributes={{ placeholder: "Enter game name" }}
                    />
                    <FormInput
                        name="startTime"
                        label="Start Time"
                        form={form}
                        required
                        inputAttributes={{ placeholder: "Enter start time" }}
                    />
                    <FormInput
                        name="endTime"
                        label="End Time"
                        form={form}
                        required
                        inputAttributes={{ placeholder: "Enter end time" }}
                    />
                    <FormNumberInput
                        name="buyingPower"
                        label="Buying Power"
                        form={form}
                        required
                        decimal
                    />
                    <div className="form-group">
                        <label htmlFor="mode">Mode</label>
                        <select
                            id="mode"
                            {...form.register("mode", { required: true })}
                            className="form-control"
                        >
                            <option value="">Select Mode</option>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                        {form.formState.errors.mode && (
                            <span className="text-red-500">Mode is required</span>
                        )}
                    </div>
                    <FormSubmit className="btn-primary" isBuffering={isCreating} />
                </form>
            </div>
        </div>
    );
}
