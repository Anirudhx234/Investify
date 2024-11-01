import type {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {useState} from "react";

export default function ProgressBar<T extends FieldValues>({ form, name, savingsGoal, savings } : { form: UseFormReturn<T>, name: string, savingsGoal: number, savings: number }) {
    const [currentSavings, setCurrentSavings] = useState(`${savings}`);

    const registerInputProps = form.register(name as Path<T>, {
        min: 0,
        max: savingsGoal,
        valueAsNumber: true,
        onChange: (e) => setCurrentSavings(e.target.value),
    });

    // Calculate progress percentage
    const progressPercentage = Math.min((parseFloat(currentSavings) / savingsGoal) * 100, 100);

    const isGoalMet = parseFloat(currentSavings) === savingsGoal;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className={"flex flex-row w-full"}>
                <div className="text-center w-full max-w-xs pr-10">
                    <label className="block mb-2">Current Savings</label>
                    <input
                        type="range"
                        className={`range ${isGoalMet ? "range-success" : "range-primary"}`}
                        {...registerInputProps}
                    />
                    <div className="text-sm mt-2">
                        ${currentSavings} of ${savingsGoal} saved
                    </div>
                </div>
                <div className={`radial-progress ${isGoalMet ? "text-success" : "text-primary"}`}  style={{ "--value": progressPercentage, "--size": "10rem" } as React.CSSProperties}>
                    {Math.round(progressPercentage)}%
                </div>
            </div>


        </div>
    );
}